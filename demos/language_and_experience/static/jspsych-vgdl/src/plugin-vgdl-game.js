//import "../../jspsych/jspsych.js";
//import { jsPsych} from  "../../jspsych/jspsych.js"; 


import * as gamejs from './gamejs.js';
import { Tools } from "./tools.js";
import { VGDLParser } from "./vgdl-parser.js";


//import $ from "jquery";

var JspsychVGDLGame = (function (jspsych) {
  'use strict';

  const info = {
    name: "vgdl-game",
    parameters: {
      game_description: {
        type: jspsych.ParameterType.STRING,
        default: undefined,
      }, 
      message: {
        type: jspsych.ParameterType.String,
        default:"",
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
      }
    },
  };

  class VGDLGamePlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
      //console.log(this.trial.path_to_static)
      //gamejs.preload([this.trial.path_to_static + "static/jspsych-vgdl/src/images/error.png"]);
    }

    trial(display_element, trial) {
      console.log("preloading")
      gamejs.preload([trial.path_to_static + "static/jspsych-vgdl/src/images/error.png"]);
      const game_description = trial.game_description;
      const vgdl_parser = VGDLParser(gamejs);
      const html = `
        <div id='header' class="Flex-Container">
          <h1 id="title">Play a game!</h1>
        </div>
        <div id='message'>
        </div>
        <div id='optional-text'></div>
        <div class="flex-buttons">
            <div class="flex-button" id='start-div'>
                <button id="start" class="jspsych-btn">Start</button>
                <button id="reset" class="jspsych-btn">Give up (minus one life)</button>
                <button id="next-won" class="jspsych-btn">Next</button>
                <button id="next-lost" class="jspsych-btn">Next</button>
                <button id="retry" class="jspsych-btn">Retry</button>
            </div>
        </div>
        <br/>
      <div id='game-body' class='Flex-Container' 
           style="display: flex; align-items: center; justify-content: flex-start; padding-left: 100px;">
        <div id="gjs-loader">
          <progress max=1 min=0 steps=0.1></progress>
          <br/>Loading...
        </div>
        <canvas id="gjs-canvas" style="margin: auto;"></canvas>
        <div id="image-container" style="margin-left: 60px;">
          <img src="` + trial.path_to_static + `static/imgs/arrowkeys_spacebar.png" alt="arrowkeys_spacebar" style="width: 140px; height: auto;">
        </div>
      </div>
      `;

    //   <div id='game-body' class='Flex-Container'>
    //   <div id="gjs-loader">
    //     <progress max=1 min=0 steps=0.1></progress>
    //     <br/>Loading...
    //   </div>
    //   <canvas id="gjs-canvas" style="margin: auto;"></canvas>

    // </div>


      display_element.innerHTML = html;
      //will this be weird with the message?

      if (trial.attempt != null) {
        var str = '<div id="level_str">Level ' + (trial.level+1) + '/' + trial.max_levels + '</div><div id="attempt_str">Life ' + trial.attempt + '/' + trial.max_attempts + '</div><div id="score_str">Score: 0</div>'
        if(trial.message != "") {
          str += '<div id="message_str"><b>Message: ' + trial.message + '</b></div>'
        }
        str += '<br>'
        document.getElementById('header').insertAdjacentHTML('afterend', str);
      }

      if(trial.optional_text != null) {
        var optionalTextDiv = document.getElementById('optional-text')
        optionalTextDiv.style.display = "block";
        optionalTextDiv.innerHTML = "<b>Tutorial instructions:</b><br>" + trial.optional_text;
        //optionalTextDiv.style.display = "block"; // Show the box
        optionalTextDiv.style.padding = "5px"; // Add padding
        optionalTextDiv.style.border = "1px solid green"; // Add green border
        optionalTextDiv.style.backgroundColor = "#c1f2bc"; // Add green background
        optionalTextDiv.style.color = "black"; // Set text color
        optionalTextDiv.style.borderRadius = "5px"; // Add rounded corners
        optionalTextDiv.style.marginTop = "0px";
        optionalTextDiv.style.marginBottom = "20px";
      }

      $("#next-won").hide();
      $("#next-lost").hide();
      $("#reset").hide();
      $("#retry").hide();

      var game = vgdl_parser.playGame(
        game_description.descs[0],
        game_description.levels[trial.level],
        0,
        // color_scheme,
      );

      let ended = false;

      var sent_data = false

      const end_trial = (won) => {
        $("#reset").remove();
        $("#next-won").remove();
        $("#next-lost").remove();
        $("#retry").remove();
        if (!sent_data) {
          sent_data = true
          //$("#gjs-canvas").remove();
          display_element.innerHTML = "";
          //console.log(game.gameStates)
          var trial_data = {
            stateHistory: game.gameStatesCompressed,
            steps: game.steps,
            won: won,
            gave_up: reset_game,
            color_dict: game.color_dict,
            image: game.max_sprite_image,
            sprites_in_image: game.n_sprites_in_img
          };
          //console.log(trial_data)
          this.jsPsych.finishTrial(trial_data);
        }
      };

      const on_game_end = () => {
        clearTimeout(reset_timer);
        game.paused = true;
        ended = true;
        $("#reset").remove();
        if (game.win) {
          $("#next-won").show();
          $("#title").text("Game Won!");
          $("#next-won").click(function(won){
            end_trial(true);
          });
        } else {
          if (game.timeout) {
            $("#title").text("Time's up: Game Lost!");
          } else {
            $("#title").text("Game Lost!");
          }
          if(trial.attempt>=trial.max_attempts) {
            $("#next-lost").show();
            $("#next-lost").click(function(won){
              end_trial(false);
            });
          } else {
            $("#retry").show();
            $("#retry").click(function(won){
              end_trial(false);
            });
          }
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
  VGDLGamePlugin.info = info;
  return VGDLGamePlugin;

})(jsPsychModule);


export default JspsychVGDLGame;
