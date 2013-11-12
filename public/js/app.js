'use strict';

// Declare app level module which depends on filters, and services

angular.module('treeChat', [
  'treeChat.controllers',
  'firebase'
]).
config(function () {

});

/* Controllers */

angular.module('treeChat.controllers', []).
  controller('TreeChatCtrl', function($scope, angularFire, angularFireCollection) {
    
    $scope.m = {
      topics: [],
      newTopic: ""
    };

    var ref = new Firebase("https://examples.firebaseio.com/tree-chat/topics");
    $scope.m.topics = angularFireCollection(ref);

    $scope.saveNewTopic = function() {
      if ($scope.m.newTopic.length > 0) {
        $scope.m.topics.push({
          text: $scope.m.newTopic, 
          comments: []
        });
      }
      $scope.m.newTopic = "";
    };

    $scope.addComment = function(topic, comment) {
      console.log(comment);
      if (comment) {
        comment.comments = comment.comments || [];
        comment.comments.push({text: comment.newComment});
        delete comment['newComment'];
        topic.comments = angular.copy(topic.comments);
        comment.comments = angular.copy(comment.comments);
        $scope.m.topics.update(topic);
      } else {
        topic.comments = topic.comments || [];
        topic.comments.push({text: topic.newComment});
        delete topic['newComment'];
        topic.comments = angular.copy(topic.comments);
        $scope.m.topics.update(topic);
      }
    };

  });
