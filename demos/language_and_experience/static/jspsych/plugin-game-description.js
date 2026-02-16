var jsPsychGameDescription = (function (jspsych) {
    'use strict';
  
    const info = {
        name: "game-description",
        parameters: {
            questions: {
                type: jspsych.ParameterType.COMPLEX,
                array: true,
                pretty_name: "Questions",
                default: undefined,
                nested: {
                    /** Question prompt. */
                    prompt: {
                        type: jspsych.ParameterType.HTML_STRING,
                        pretty_name: "Prompt",
                        default: undefined,
                    },
                    init_text: {
                      type: jspsych.ParameterType.HTML_STRING,
                      pretty_name: "init text",
                      default: "",
                  },
                    /** Placeholder text in the response text box. */
                    placeholder: {
                        type: jspsych.ParameterType.STRING,
                        pretty_name: "Placeholder",
                        default: "",
                    },
                    /** The number of rows for the response text box. */
                    rows: {
                        type: jspsych.ParameterType.INT,
                        pretty_name: "Rows",
                        default: 1,
                    },
                    /** The number of columns for the response text box. */
                    columns: {
                        type: jspsych.ParameterType.INT,
                        pretty_name: "Columns",
                        default: 40,
                    },
                    /** Whether or not a response to this question must be given in order to continue. */
                    required: {
                        type: jspsych.ParameterType.BOOL,
                        pretty_name: "Required",
                        default: false,
                    },
                    /** Name of the question in the trial data. If no name is given, the questions are named Q0, Q1, etc. */
                    name: {
                        type: jspsych.ParameterType.STRING,
                        pretty_name: "Question Name",
                        default: "",
                    },
                },
            },
            /** If true, the order of the questions in the 'questions' array will be randomized. */
            randomize_question_order: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Randomize Question Order",
                default: false,
            },
            /** HTML-formatted string to display at top of the page above all of the questions. */
            preamble: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Preamble",
                default: null,
            },
            additional_text: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "text",
                default: null,
            },
            img_html: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "img html",
              default: "",
          },
            /** Label of the button to submit responses. */
            button_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Button label",
                default: "Continue",
            },          /** Label of the button to submit responses. */
            color_dict: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "color dict",
                default: {},
            },
            /** Setting this to true will enable browser auto-complete or auto-fill for the form. */
            autocomplete: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Allow autocomplete",
                default: false,
            },
        },
    };
    /**
     * **game-description**
     *
     * modified from:
     *    jsPsych plugin for free text response survey questions
     *
     *    @author Josh de Leeuw
     *    @see {@link https://www.jspsych.org/plugins/jspsych-survey-text/ survey-text plugin documentation on jspsych.org}
     */
    class GameDescriptionPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            for (var i = 0; i < trial.questions.length; i++) {
                if (typeof trial.questions[i].rows == "undefined") {
                    trial.questions[i].rows = 1;
                }
            }
            for (var i = 0; i < trial.questions.length; i++) {
                if (typeof trial.questions[i].columns == "undefined") {
                    trial.questions[i].columns = 40;
                }
            }
            for (var i = 0; i < trial.questions.length; i++) {
                if (typeof trial.questions[i].value == "undefined") {
                    trial.questions[i].value = "";
                }
            }
            var html = "";
            // show preamble text
            if (trial.preamble !== null) {
                html +=
                    '<div id="jspsych-survey-text-preamble" class="jspsych-survey-text-preamble">' +
                        trial.preamble +
                        "</div>";
            }
            // start form
            if (trial.autocomplete) {
                html += '<form id="jspsych-survey-text-form">';
            }
            else {
                html += '<form id="jspsych-survey-text-form" autocomplete="off">';
            }
            html += '<div class="container" style="display:flex; justify-content:center; align-items:flex-start; position:relative;">'/* Centers the entire flex container */
            html += '<div style="margin: 0 auto; text-align: center;"><br>'
            html += trial.img_html
  
            // generate question order
            // add questions
            var question = trial.questions[0];
            var question_index = 0;
            html +=
              '<div id="jspsych-survey-text-' +
                  question_index +
                  '" class="jspsych-survey-text-question" style="margin: 2em 0em;">';
            html += '<p class="jspsych-survey-text">' + question.prompt + "</p>";
            var autofocus = i == 0 ? "autofocus" : "";
            var req = question.required ? "required" : "";
            html +=
              '<textarea id="input-' +
                  question_index +
                  '" name="#jspsych-survey-text-response-' +
                  question_index +
                  '" data-name="' +
                  question.name +
                  '" cols="' +
                  question.columns +
                  '" rows="' +
                  question.rows +
                  '" ' +
                  autofocus +
                  " " +
                  req +
                  ' placeholder="' +
                  question.placeholder +
                  '" ' +
                  'oncopy="return false;" oncut="return false;" onpaste="return false;">' + 
                  question.init_text + 
                  '</textarea>';
      
            html += '</div>' //end first div
            html += '</div>' //end first div
            html += '<div style="align:right"><canvas id="colorCanvas" width="170" height="450"></canvas></div>' //add second div
            html += '</div>' //end container
  
            // add submit button
  
            html += trial.additional_text;
  
            html +=
                '<input type="submit" id="jspsych-survey-text-next" class="jspsych-btn jspsych-survey-text" value="' +
                    trial.button_label +
                    '" disabled></input>';
            html += "</form>";
  
            display_element.innerHTML = html;
            // backup in case autofocus doesn't work
            display_element.querySelector("#input-" + 0).focus();
  
            const countdown = setInterval(() => {
              clearInterval(countdown);
              timeUpFunction(); // Call the function when time is up
            }, 30*1000);
    
              // Function to be called when the timer reaches zero
              function timeUpFunction() {
                  display_element.querySelector("#jspsych-survey-text-next").disabled = false;
              }
  
            //color canvas
            const canvas = document.getElementById('colorCanvas');
            const ctx = canvas.getContext('2d');
            const squareSize = 25; // Size of each color square
            const labelOffset = 10; // Offset for text label
            const padding = 10; // Space between squares
            const columns = 1; // Number of squares per row
  
            let x = padding;
            let y = padding;
            let count = 0;
            for (const [colorName, hexCode] of Object.entries(trial.color_dict)) {
                // Draw the color square
                ctx.fillStyle = hexCode;
                ctx.fillRect(x, y, squareSize, squareSize);
                // Draw the color label
                ctx.fillStyle = "#000"; // Text color (black)
                ctx.font = "12px Arial";
                ctx.fillText(colorName, x + squareSize + labelOffset, y + squareSize / 2 + 4);
  
                // Update x, y positions for next square
                count++;
                if (count % columns === 0) {
                  x = padding;
                  y += squareSize + padding;
                } else {
                  x += squareSize + labelOffset + 50; // Adjust space for the text label
                }
            }
  
  
            display_element.querySelector("#jspsych-survey-text-form").addEventListener("submit", (e) => {
                e.preventDefault();
                const textarea = document.querySelector("#input-0");
                const minChars = 50;
                const textContent = textarea.value.trim();
  
                if (textContent.length < minChars) {
                    alert(`Please write at least ${minChars} characters before continuing.`);
                    return;
                }
  
                // measure response time
                var endTime = performance.now();
                var response_time = Math.round(endTime - startTime);
                // create object to hold responses
                var question_data = {};
                for (var index = 0; index < trial.questions.length; index++) {
                    var id = "Q" + index;
                    var q_element = document
                        .querySelector("#jspsych-survey-text-" + index)
                        .querySelector("textarea, input");
                    var val = q_element.value;
                    var name = q_element.attributes["data-name"].value;
                    if (name == "") {
                        name = id;
                    }
                    var obje = {};
                    obje[name] = val;
                    Object.assign(question_data, obje);
                }
                // save data
                var trialdata = {
                    rt: response_time,
                    response: question_data,
                };
                display_element.innerHTML = "";
                // next trial
                this.jsPsych.finishTrial(trialdata);
            });
            var startTime = performance.now();
        }
    }
    GameDescriptionPlugin.info = info;
  
    return GameDescriptionPlugin;
  
  })(jsPsychModule);
  