/**
 * @title jspsych-vgdl
 * @description Running vgdl games in jspsych
 * @version 0.1.0
 *
 * @assets assets/
 */


//import "./jspsych/jspsych.css";
import { exampleVGDLGames } from "./jspsych-vgdl/src/example-games.js";
import JspsychVGDLGame from "./jspsych-vgdl/src/plugin-vgdl-game.js";
import JspsychVGDLGameDemo from "./jspsych-vgdl/src/plugin-vgdl-game-demo.js";
import { triggerOnLading } from "./jspsych-vgdl/src/ontology/effect.js";
import {message_dict} from "./messages.js"
import {vgdl_text_dict} from "./vgdl_text.js"

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */


  var game_names_to_idxs = {"JRNL_relational_v0":1, "JRNL_plaqueAttack_v0":2, "JRNL_missile_command_v0":3, "JRNL_preconditions_v0":4, "JRNL_beesAndBirds_v0":5, "JRNL_portals_v0":6, "JRNL_aliens_v0":7, "JRNL_avoidGeorge_v0":8, "JRNL_pushBoulders_v0":9, "JRNL_jaws_v0":10}
  var game_names = ["Relational", "Plaque Attack", "Missile Command", "Preconditions", "Bees and Birds", "Portals", "Aliens", "Avoid George", "Push Boulders", "Jaws"]
  var games = exampleVGDLGames

  var won_last = false

  var curr_game_idx = 0
  var level = 0
  var play_again = true
  var prev_message_title = null
  const jsPsych = initJsPsych();

  // Preload assets
  var game_trial = {
    type: JspsychVGDLGameDemo,
    game_description: function() {
      return games[curr_game_idx];
    },
    vgdl_text: function() {
      console.log(games[curr_game_idx]['name'])
      console.log(vgdl_text_dict[games[curr_game_idx]['name']])
      return vgdl_text_dict[games[curr_game_idx]['name']]
    },
    current_message_title: function() {
      return prev_message_title
    },
    messages: function() {
      console.log(games[curr_game_idx]['name'])
      return message_dict[games[curr_game_idx]['name']]
    },
    level: function() {
      return level
    },
    max_levels: function() {
      return games[curr_game_idx]['levels'].length;
    },
    path_to_static: "",
    allow_giveup: function() {
      var name = games[curr_game_idx]['name']
      if (["JRNL_pushBoulders_v0", "JRNL_relational_v0"].includes(name)) {
        return true
      } else {
        return false
      }
    },
    on_finish: function(data) {
      if (data.won) {
        level = level + 1
        won_last = true
      } else {
        won_last = false
      }
      play_again = level < 4 & !(data.back)//data.play_again
      if (play_again) {
        prev_message_title = data.current_message_title
      } else {
        prev_message_title = null
      }
    }
  }

  //loop thru levels of a single game
  var game_loop = {
    timeline: [game_trial],
    loop_function: function() {
      return play_again
    }
  }



  var select_game = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <style>
        /* Match main site theme */
        body {
          background: #010138 !important;
        }
        .jspsych-display-element {
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          color: #e0e0ff;
        }
        .jspsych-content-wrapper {
          background: #010138;
        }
        #jspsych-html-button-response-stimulus {
          max-width: 720px;
          margin: 0 auto;
          text-align: left;
        }
        .demo-header {
          margin-top: 40px;
          margin-bottom: 28px;
        }
        .demo-header h1 {
          font-size: 26px;
          font-weight: 600;
          line-height: 1.3;
          color: #e0e0ff;
          margin: 0 0 16px 0;
          text-align: center;
        }
        .demo-header .authors {
          text-align: center;
          font-size: 14px;
          color: rgba(224, 224, 255, 0.6);
          margin-bottom: 20px;
        }
        .demo-header .authors a {
          color: #535de6;
          text-decoration: none;
        }
        .demo-header .authors a:hover {
          color: #fe4791;
          text-decoration: underline;
        }
        .demo-description {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(224, 224, 255, 0.85);
          margin-bottom: 12px;
        }
        .demo-description strong {
          color: #e0e0ff;
        }
        .demo-description a {
          color: #535de6;
          text-decoration: none;
          font-weight: 500;
        }
        .demo-description a:hover {
          color: #fe4791;
          text-decoration: underline;
        }
        .demo-divider {
          border: none;
          border-top: 1px solid #1E3542;
          margin: 24px 0;
        }
        .demo-pick {
          font-size: 18px;
          font-weight: 600;
          color: #e0e0ff;
          margin: 0 0 4px 0;
          text-align: center;
        }
        .demo-pick-sub {
          font-size: 13px;
          color: rgba(224, 224, 255, 0.5);
          text-align: center;
          margin: 0;
        }
        /* Restyle the jsPsych button group as a grid */
        #jspsych-html-button-response-btngroup {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          max-width: 720px;
          margin: 20px auto 0 !important;
        }
        .jspsych-html-button-response-button {
          display: block !important;
          margin: 0 !important;
        }
        .jspsych-html-button-response-button .jspsych-btn {
          width: 100%;
          padding: 14px 12px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          color: #e0e0ff;
          background: rgba(224, 224, 255, 0.06);
          border: 1.5px solid #1E3542;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .jspsych-html-button-response-button .jspsych-btn:hover {
          background: rgba(254, 71, 145, 0.12);
          border-color: #fe4791;
          color: #fe4791;
        }
      </style>

      <div class="demo-header">
        <h1>Learning from Language and Experience in Video Games</h1>
        <p class="authors">
          Interactive demo for
          <a href="https://arxiv.org/abs/2509.00074" target="_blank">Colas, Mills, Prystawski, Tessler, Goodman, Andreas, Tenenbaum (2025)</a>.
        </p>
      </div>

      <p class="demo-description">
        How do people combine advice from others with their own experience to learn
        new tasks? We model this as multimodal Bayesian inference: learners jointly
        update structured world models from both sensorimotor experience and linguistic
        guidance. Across 10 video games, we show that language helps both human players
        and AI agents explore more safely and learn faster. Our computational models
        capture how people integrate these two sources of knowledge — and can themselves
        interact with human players, exchanging advice across generations.
      </p>
      <p class="demo-description">
        This demo lets you <strong>play each of the 10 games</strong> from the paper. When you select a game,
        you can read the messages that human participants and AI models wrote, and
        use them to help you figure out what to do. Use the <strong>arrow keys</strong> to move
        and the <strong>spacebar</strong> to interact.
      </p>

      <hr class="demo-divider">
      <p class="demo-pick">Select a game</p>
      <p class="demo-pick-sub">Each game has 4 levels of increasing difficulty</p>
    `,
    choices: game_names,
    on_finish: function(data){
      curr_game_idx = data.response + 1;
    }
  };


  var run_games = {
    timeline: [select_game, game_loop],
    loop_function: function() {
      level = 0
      return true
    }
  }


  //save data to database
  function save_data(data) {
      var url = ""; 
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          data
      }));
  }

  function save_data_compressed(data) {
    var url = ""; 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Content-Encoding', 'gzip'); // Inform the server about the compression

    // Compress the data using pako
    var compressedData = pako.gzip(JSON.stringify({ data }));

    // Send the compressed data as a binary array
    xhr.send(compressedData);
  }


  var timeline = [run_games]
  
  await jsPsych.run(timeline);

