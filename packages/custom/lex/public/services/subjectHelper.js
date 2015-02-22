angular.module('mean.lex').factory('SubjectHelper', [

/*
  This is more than just subject labels...
  it is used by controllers/subject.js to store all the subjects
  for display on subjects.html

  It's very confusing how I did this, but I couldn't really think
  of a better way.
*/

  function() {
    return {
      cli:   {
        label:    'Command Line Interface',
        subjects: []
      },
      langs: {
        label:    'Languages',
        subjects: []
      },
      algs:  {
        label:    'Algorithms',
        subjects: []
      }
    }
  }

]);
