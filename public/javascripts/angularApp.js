angular.module('flapperNews', ['ui.router'])

.config(['$stateProvider',
			'$urlRouterProvider',
			function($stateProvider, $urlRouterProvider){
				$stateProvider
				.state('home',{
					url: '/home',
					templateUrl: '/home.html',
					controller: 'MainCtrl'
					//given a name ('home'), URL ('/home'), and template URL ('/home.html'). We've also told Angular that our new state should be controlled by MainCtrl
				})
				.state('posts', {
					  url: '/posts/{id}',
					  templateUrl: '/posts.html',
					  controller: 'PostsCtrl'
					})
				$urlRouterProvider.otherwise('home');
			}])

.controller('MainCtrl', [
	'$scope', 
	'posts', 
	function($scope, posts) {
  	$scope.posts = posts.posts;
   

	 $scope.addPost = function(){
	 	if( !$scope.title || $scope.title === '' ) return;
	 	else{
		$scope.posts.push({
				  title: $scope.title,
				  link: $scope.link,
				  upvotes: 0,
				  comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				  ]
				});
		$scope.title='';
		$scope.link='';
		}
	}
	$scope.incrementUpvotes = function(post){
		post.upvotes +=1;
	}
	$scope.decrementUpvotes = function(post){
		post.upvotes -=1;
	}

}])

.controller('PostsCtrl', [
'$scope',
'posts',

function($scope, posts) {
	$scope.post = {title: 'hello' , link:'www.google.com'};
	$scope.addComment = function() {
		if ($scope.body === '') { return; }
		posts.addComment(post._id, {
			body: $scope.body,
			author: 'user',
		}).success(function(comment) {
			$scope.post.comments.push(comment);
		});
		$scope.body = '';
	};
    $scope.incrementUpvotes = function (comment) {
        comment.upvotes += 1;
    };
    $scope.incrementUpvotes = function (comment) {
        posts.upvoteComment(post, comment);
    };
}])

.factory('posts',[function(){

	var o = {
		posts : []
	};
	return o;

}])
