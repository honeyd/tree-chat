'use strict';

// Declare app level module which depends on filters, and services

angular.module('treeChat', [
  'treeChat.controllers',
  'firebase'
]);

/* Controllers */

angular.module('treeChat.controllers', []).
  controller('TreeChatCtrl', function($scope, angularFireCollection) {
    
    $scope.m = {
      topics: [],
      newTopic: ""
    };

    $scope.m.topics = angularFireCollection(new Firebase("https://examples.firebaseio.com/tree-chat/topics"));

    $scope.addComment = function(topic, comment) {
      if (comment) {
        comment.comments = comment.comments || [];
        comment.comments.push({text: comment.newComment});
        delete comment['newComment'];
        delete comment['replying'];
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
