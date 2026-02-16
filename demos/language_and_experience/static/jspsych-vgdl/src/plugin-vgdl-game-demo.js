import * as gamejs from './gamejs.js';
import { Tools } from "./tools.js";
import { VGDLParser } from "./vgdl-parser.js";

//import $ from "jquery";

var JspsychVGDLGameDemo = (function (jspsych) {
  'use strict';

  const info = {
    name: "vgdl-game-demo",
    parameters: {
      game_description: {
        type: jspsych.ParameterType.STRING,
        default: undefined,
      }, 
      messages: {
        type: jspsych.ParameterType.String,
        default:"",
      },
      current_message_title: {
        type: jspsych.ParameterType.String,
        default:null,
      },
      level: {
        type: jspsych.ParameterType.Int,
        default: 0,
      },
      allow_giveup: {
        type: jspsych.ParameterType.BOOL,
        default: false,
      },
      optional_text: {
        type: jspsych.ParameterType.STRING,
        default: null,
      },
      max_levels: {
        type: jspsych.ParameterType.Int,
        default: 0,
      },
      attempt: {
        type: jspsych.ParameterType.Int,
        default: null,
      },
      max_attempts: {
        type: jspsych.ParameterType.Int,
        default: null,
      },
      path_to_static: { 
        type: jspsych.ParameterType.STRING,
        default: 'game1/'
      },
      vgdl_text: {
        type: jspsych.ParameterType.STRING,
        default: null
      }
    },
  };

  class VGDLGameDemoPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
      //console.log(this.trial.path_to_static)
      //gamejs.preload([this.trial.path_to_static + "static/jspsych-vgdl/src/images/error.png"]);
    }

    trial(display_element, trial) {
      gamejs.preload([trial.path_to_static + "static/jspsych-vgdl/src/images/error.png"]);
      const game_description = trial.game_description;
      const vgdl_parser = VGDLParser(gamejs);
    
      var vgdl_text = `
      <pre style="text-align: left; font-family: monospace; font-size: 10px; white-space: pre-wrap;">`
      + trial.vgdl_text +
      `</pre>`


      // const html = `
      // `


      const html = `
      <style>
        body { background: #010138 !important; }
        .jspsych-display-element { color: #e0e0ff; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }
        .jspsych-content-wrapper { background: #010138; }
        #title { color: #e0e0ff; font-size: 22px; font-weight: 600; }
        #title.game-end { color: #fe4791; }
        #level_str, #score_str { color: rgba(224, 224, 255, 0.7); font-size: 14px; }
        .jspsych-btn {
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          color: #e0e0ff;
          background: rgba(224, 224, 255, 0.06);
          border: 1.5px solid #1E3542;
          border-radius: 8px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .jspsych-btn:hover {
          background: rgba(254, 71, 145, 0.12);
          border-color: #fe4791;
          color: #fe4791;
        }
        #info-panel {
          text-align: left;
          color: rgba(224, 224, 255, 0.85);
          background: #010138;
          border: 1px solid #1E3542;
          border-radius: 8px;
          padding: 12px;
        }
        #info-panel pre { color: rgba(224, 224, 255, 0.75); }
        #message-output {
          color: #e0e0ff;
          background: rgba(224, 224, 255, 0.06);
          border: 1px solid #1E3542;
          border-radius: 8px;
        }
        #message-select {
          color: #e0e0ff;
          background: rgba(224, 224, 255, 0.06);
          border: 1.5px solid #1E3542;
        }
        #message-select option { background: #010138; color: #e0e0ff; }
      </style>

      <div id="back-button-container" style="position: absolute; top: 20px; left: 20px;">
        <button id="back" class="jspsych-btn">Back to all games</button>
      </div>

      <div id="info-toggle-container" style="position: absolute; top: 20px; right: 20px; max-width: 500px; z-index: 100;">
        <button id="info-toggle" class="jspsych-btn">Show VGDL source code</button>
        <div id="info-panel" style="display: none; margin-top: 10px;">
          <p>` + vgdl_text + `</p>
        </div>
      </div>
        <div id='header' class="Flex-Container" >
          <h1 id="title">Play the game!</h1>
        </div>
        <div id='message'>
        </div>
        <div id='optional-text'></div>
        <div class="flex-buttons">
            <div class="flex-button" id='start-div' style="margin-top: 5px; margin-bottom: 5px">
                <button id="start" class="jspsych-btn">Start</button>
                <button id="reset" class="jspsych-btn">Give up (minus one life)</button>
                <button id="next-won" class="jspsych-btn">Next</button>
                <button id="next-lost" class="jspsych-btn">Next</button>
                <button id="retry" class="jspsych-btn">Retry</button>
            </div>
        </div>
      <div id='game-body' class='Flex-Container' style="width: 50%; display: flex; align-items: center; justify-content: flex-start;">
        <div id="gjs-loader" style="color: rgba(224, 224, 255, 0.6);">
          <progress max=1 min=0 steps=0.1></progress>
          <br/>Loading...
        </div>
        <canvas id="gjs-canvas" style="margin: auto;"></canvas>
        <div id="image-container" style="margin-left: 20px;">
          <img src="` + trial.path_to_static + `static/imgs/arrowkeys_spacebar.png" alt="arrowkeys_spacebar" style="width: 98px; height: auto;">
        </div>
      </div>

      <div id="message-select-container" style="margin-top: 20px; text-align: center;">
        <div id="message-output"
            style="margin-top: 15px; display: none;
                    padding: 12px; border-radius: 8px;
                    max-width: 800px; margin-left: auto; margin-right: auto; font-size: 15px;
                    line-height: 1.3;">
        </div>
        <br>
        <select id="message-select" class="jspsych-btn" style="width: 300px;">
          <option value="" disabled selected>Select a message...</option>
        </select>
      </div>

      </div>
      </pre>
      `;

      document.addEventListener('keydown', function(event) {
        const keysToBlock = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ']; // spacebar is ' '
        if (keysToBlock.includes(event.key)) {
          event.preventDefault();
        }
      });

      //padding-left: 70px; padding-right: 100px;

      display_element.innerHTML = html;
      //will this be weird with the message?
      const msgSelect = document.getElementById("message-select");
      Object.keys(trial.messages).forEach(title => {
        const opt = document.createElement("option");
        opt.value = title;       // value is the title
        opt.textContent = title; // what appears in dropdown
        msgSelect.appendChild(opt);
      });
      msgSelect.addEventListener("change", function () {
        const output = document.getElementById("message-output");
        const title = this.value;
        trial.current_message_title = title
        const content = trial.messages[title];  // lookup content by title

        output.style.display = "block";
        output.textContent = content;
      });
      // Initialize
      if (trial.current_message_title) {
        var output = document.getElementById("message-output");
        var content = trial.messages[trial.current_message_title];
        output.style.display = "block";
        output.textContent = content;
      }


      var str = '<div id="level_str">Level ' + (trial.level+1) + '/' + trial.max_levels + '</div><div id="score_str">Score: 0</div>'
      document.getElementById('header').insertAdjacentHTML('afterend', str);

      $("#next-won").hide();
      $("#next-lost").hide();
      $("#reset").hide();
      $("#retry").hide();

      document.getElementById('info-toggle').addEventListener('click', function () {
        const panel = document.getElementById('info-panel');
        if (panel.style.display === 'none') {
          panel.style.display = 'block';
          this.textContent = 'Hide source code';
        } else {
          panel.style.display = 'none';
          this.textContent = 'Show VGDL source code';
        }
      });


      var game = vgdl_parser.playGame(
        game_description.descs[0],
        game_description.levels[trial.level],
        0,
        // color_scheme,
      );

      let ended = false;

      var sent_data = false
      var back = false

      const end_trial = (won) => {
        $("#reset").remove();
        $("#next-won").remove();
        $("#next-lost").remove();
        $("#back").remove();
        $("#retry").remove();
        if (!sent_data) {
          sent_data = true
          //$("#gjs-canvas").remove();
          display_element.innerHTML = "";
          //console.log(game.gameStates)
          var trial_data = {
            stateHistory: game.gameStatesCompressed,
            current_message_title: trial.current_message_title,
            steps: game.steps,
            won: won,
            gave_up: reset_game,
            back: back,
            color_dict: game.color_dict,
            image: game.max_sprite_image,
            sprites_in_image: game.n_sprites_in_img
          };
          //console.log(trial_data)
          this.jsPsych.finishTrial(trial_data);
        }
      };

      // want retry, next level, 
      const on_game_end = () => {
        clearTimeout(reset_timer);
        game.paused = true;
        ended = true;
        $("#reset").remove();
        if (game.win) {
          $("#next-won").show();
          $("#title").addClass("game-end").text("Game Won!");
          $("#next-won").click(function(won){
            end_trial(true);
          });
        } else {
          if (game.timeout) {
            $("#title").addClass("game-end").text("Time's up: Game Lost!");
          } else {
            $("#title").addClass("game-end").text("Game Lost!");
          }
          $("#retry").show();
          $("#retry").click(function(won){
            end_trial(false);
          });
          // if(trial.attempt>=trial.max_attempts) {
          //   $("#next-lost").show();
          //   $("#next-lost").click(function(won){
          //     end_trial(false);
          //   });
          // } else {
          //   $("#retry").show();
          //   $("#retry").click(function(won){
          //     end_trial(false);
          //   });
          // }
        }
      };

      const on_score_change = () => {
        document.getElementById("score_str").innerHTML = "Score: " + game.score;
      }

      var reset_timer;
      var begin_game = () => {
        //gamejs.ready(game.run(on_game_end));
        $("#start").remove();
        reset_timer = setTimeout(() => {
          if (trial.allow_giveup) {
            $("#reset").show();
          }
        }, 30000)
        game.paused = false;
      };

      $("#gjs-canvas").focus();
      $("#start").click(begin_game);

      $("#back").click(function(){
        back=true
        on_game_end()
        end_trial(false);
      });

      let reset_game = false;
      function reset() {
        reset_game = true;
        on_game_end()
      }

      $("#reset").click(reset)

      game.paused = true;
      gamejs.ready(game.run(on_game_end, on_score_change));

    }
  }
  VGDLGameDemoPlugin.info = info;
  return VGDLGameDemoPlugin;

})(jsPsychModule);


export default JspsychVGDLGameDemo;
