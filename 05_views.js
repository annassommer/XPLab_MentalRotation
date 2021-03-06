// In this file you can instantiate your views
// First instantiate your wrapping views, then you can instantiate your trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

* More about the properties and functions of the wrapping views - https://github.com/babe-project/babe-project/blob/master/docs/views.md#wrapping-views-properties

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = babeViews.view_generator('intro', {
    trials: 1,
    name: 'intro',
    // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
    text:   `
            <br />
            <br />
            This experiment is split into a practice phase and a main phase.
            <br />
            The practice phase will introduce you to the task, so you will perform more securely in the main task.
            In this phase you will get feedback, if your answer was correct.
            <br />
            <br />
            You will get further instructions before the experiment starts`,
   buttonText: 'Begin the experiment'
});

// For most tasks, you need instructions views
const instructions = babeViews.view_generator("instructions", {
    trials: 1,
    name: 'instrucions',
    title: 'Generall Instructions',
    text:  `In the experiment you will be shown two different pictures of building blocks.
            It is your task to decide, if the blocks form the same figure, or different ones.
            Press the key 'b' if you think they form the same figure and the key 'n' if you think they form different ones.
            <br />
            <br />
            Please try to be as fast and accurate as possible.
            `,
    buttonText: 'go to trials'
});

const beginP = babeViews.view_generator("begin",{
    trials: 1,
    name: 'begin',
    title: 'Practice Phase',
    text: 'You will receive feedback after every trial. To begin the test trial click the button "Go".',
    buttonText: 'Go'

});

const beginT = babeViews.view_generator("begin",{
    trials: 1,
    name: 'begin',
    title: 'Main Test',
    text: 'From now on you will not get any feedback. To begin the test trial click the button "Go".',
    buttonText: 'Go'

});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = babeViews.view_generator("post_test",{
    trials: 1,
    name: 'post_test',
    title: 'Additional information',
    text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

    // You can change much of what appears here, e.g., to present it in a different language, as follows:
    // buttonText: 'Weiter',
    // age_question: 'Alter',
    // gender_question: 'Geschlecht',
    // gender_male: 'männlich',
    // gender_female: 'weiblich',
    // gender_other: 'divers',
    // edu_question: 'Höchster Bildungsabschluss',
    // edu_graduated_high_school: 'Abitur',
    // edu_graduated_college: 'Hochschulabschluss',
    // edu_higher_degree: 'Universitärer Abschluss',
    // languages_question: 'Muttersprache',
    // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = babeViews.view_generator("thanks",{
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _babe (e.g. for use with a progress bar)
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about trial life cycle - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-lifecycle

    - hook: object - option to hook and add custom functions to the view
        More about hooks - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-hooks

* All about the properties of trial - https://github.com/babe-project/babe-project/blob/master/docs/views.md#properties-of-trial
*/


// Here, we initialize a forcedChoice view


const forced_choice_2A = babeViews.view_generator('key_press',{
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.key_press_trials.length,
    // name and trial_type should be identical to the variable name
    name: 'key_press_test',
    data: trial_info.key_press_trials,
    stim_duration: 7500,
    stim_duration: 'f',
    stim_duration: 'j',
    fix_duration: 500,
    pause: 1000,
    hook: {
        after_response_enabled: checkResponse,
    },
});

const forced_choice_2B = babeViews.view_generator('key_press',{
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.key_press_trials_main.length,
    // name and trial_type should be identical to the variable name
    name: 'key_press_main',
    data: trial_info.key_press_trials_main,
    stim_duration: 7500,
    stim_duration: 'f',
    stim_duration: 'j',
    fix_duration: 500,
    pause: 1000,
});


// compares the chosen answer to the value of `option1`
function checkResponse(data, next) {
  data.response_checked = false;
  $("body").on("keydown", function(e) {
    if(data.response_checked == false) {
      const keyPressed = String.fromCharCode(
          e.which
      ).toLowerCase();
      if(keyPressed == data.key1 || keyPressed == data.key2) {
          if(data[keyPressed] === data.expected) {
            alert('Your answer is correct! Yey!');
          } else {
            alert('Sorry, this answer is incorrect. The correct answer is:  ' + data.expected);
          }
          $("body").off("keydown");
          next();
      }
    }
  }) ;


}

// There are many more templates available:
// forcedChoice, sliderRating, dropdownChoice, testboxInput, ratingScale, imageSelection, sentenceChoice, keyPress, selfPacedReading and selfPacedReading_ratingScale

// If the provided templates are not enough, we can just create custom view templates in 02_custom_views_templates.js and use them here
