var library = {
   'balanced':{  
      'Frequency':{  
         'Start':261,
         'Slide':-0.68,
         'RepeatSpeed':0.45509235102217643,
         'Min':646,
         'Max':1800
      },
      'Generator':{  
         'Func':'noise',
         'A':0,
         'B':0,
         'ASlide':-0.01
      },
      'Volume':{  
         'Sustain':0.29,
         'Decay':0.86,
         'Punch':2.23,
         'Attack':0.28
      },
      'Vibrato':{  
         'Depth':0.19,
         'DepthSlide':0,
         'Frequency':0.01
      },
      'Phaser':{  
         'Offset':-0.01
      },
      'Filter':{  
         'LP':1,
         'LPSlide':0.01,
         'LPResonance':0,
         'HP':0
      }
   },
   'slow start':{  
      'Frequency':{  
         'Start':319,
         'Slide':-0.43,
         'RepeatSpeed':0.45509235102217643,
         'Min':646,
         'Max':1800
      },
      'Generator':{  
         'Func':'noise',
         'A':0,
         'B':0,
         'ASlide':-0.01
      },
      'Volume':{  
         'Sustain':0.29,
         'Decay':0.86,
         'Punch':2.23,
         'Attack':0.32
      },
      'Vibrato':{  
         'Depth':0.19,
         'DepthSlide':0,
         'Frequency':0.01
      },
      'Phaser':{  
         'Offset':-0.01
      },
      'Filter':{  
         'LP':1,
         'LPSlide':0.01,
         'LPResonance':0,
         'HP':0
      }
   },
   'cannon boom':{  
      'Frequency':{  
         'Start':261,
         'Slide':-0.68,
         'RepeatSpeed':0.45509235102217643,
         'Min':646,
         'Max':1800
      },
      'Generator':{  
         'Func':'noise',
         'A':0,
         'B':0,
         'ASlide':-0.01
      },
      'Volume':{  
         'Sustain':0.29,
         'Decay':0.86,
         'Punch':2.23,
         'Attack':0.28
      },
      'Vibrato':{  
         'Depth':0.19,
         'DepthSlide':0,
         'Frequency':0.01
      },
      'Phaser':{  
         'Offset':-0.01
      },
      'Filter':{  
         'LP':0.85,
         'LPSlide':0.01,
         'LPResonance':0,
         'HP':0
      }
   },
   'expectation massive':{  
      'Frequency':{  
         'Start':238,
         'Slide':-0.68,
         'RepeatSpeed':0.45509235102217643,
         'Min':646,
         'Max':1800
      },
      'Generator':{  
         'Func':'noise',
         'A':0,
         'B':0,
         'ASlide':-0.01
      },
      'Volume':{  
         'Sustain':0.29,
         'Decay':0.85,
         'Punch':3,
         'Attack':0.76,
         'Master':0.85
      },
      'Vibrato':{  
         'Depth':0.19,
         'DepthSlide':0,
         'Frequency':0.01
      },
      'Phaser':{  
         'Offset':0.01
      },
      'Filter':{  
         'LP':0.86,
         'LPSlide':0.01,
         'LPResonance':0,
         'HP':0
      }
   }
};


var sfx = jsfx.Sounds(library);

var EarthFx = window.EarthFx = {};

EarthFx.smallMeteorFx = function () {
  sfx['cannon boom']();
};

EarthFx.bigMeteorFx = function () {
  sfx['expectation massive']();
};

EarthFx.noise1 = function () {
  sfx['balanced']();
};

EarthFx.noise2 = function () {
  sfx['slow start']();
};
