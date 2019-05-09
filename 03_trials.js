// In this file you can specify the trial data for your experiment

const trial_info = {
    key_press_trials: [

    ],
    key_press_trials_main: [

    ],
};

// create an array of filenames and shuffle it for the test run
var images_test = [];
for(i = 13; i<=15; i++) {
    images_test.push({name: ''+i+'_50_same.jpg', expected: 'same', rotation: '50'});
    images_test.push({name: ''+i+'_50_different.jpg', expected: 'different', rotation: '50'});
    images_test.push({name: ''+i+'_150_same.jpg', expected: 'same', rotation: '150'});
    images_test.push({name: ''+i+'_150_different.jpg', expected: 'different', rotation: '150'});
}
images_test = shuffle(images_test);

// create an array of filenames and shuffle it for the main run
var images_main = [];
for(i = 1; i<=12; i++) {
    images_main.push({name: ''+i+'_50_same.jpg', expected: 'same', rotation: '50'});
    images_main.push({name: ''+i+'_50_different.jpg', expected: 'different', rotation: '50'});
    images_main.push({name: ''+i+'_150_same.jpg', expected: 'same', rotation: '150'});
    images_main.push({name: ''+i+'_150_different.jpg', expected: 'different', rotation: '150'});
}
images_main = shuffle(images_main);

// add the images to the trials
for(i = 0; i < 5; i++) {
  trial_info.key_press_trials.push({
      question: "Are the two figures the same?",
      picture: 'images/'+images_test[i].name,
      key1: 'b',
      key2: 'n',
      b: 'same',
      n: 'different',
      picturesShown: i+1,
      rotation: images_test[i].rotation,
      expected: images_test[i].expected
  });
}

for(i = 0; i < 5; i++) {
  trial_info.key_press_trials_main.push({
      question: "Are the two figures the same?",
      picture: 'images/'+images_main[i].name,
      key1: 'b',
      key2: 'n',
      b: 'same',
      n: 'different',
      picturesShown: i+1,
      rotation: images_main[i].rotation,
      expected: images_main[i].expected
  });
}

// shuffle an array
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
