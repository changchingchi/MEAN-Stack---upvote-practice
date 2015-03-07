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
	//second param posts is from factory. 	
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
'$stateParams',
'posts',
function($scope, $stateParams, posts){
		// $scope.post = {title: 'hello' , link:'www.google.com'};
		console.log($stateParams);
		$scope.post = posts.posts[0];	
			$scope.addComment = function(){
				  if($scope.body === '') { return; }
				  $scope.post.comments.push({
				    body: $scope.body,
				    author: 'user',
				    upvotes: 0
				  });
				  $scope.body = '';
				};
		    $scope.incrementUpvotes = function (comment) {
		        comment.upvotes += 1;
		    };
		    // $scope.incrementUpvotes = function (comment) {
		    //     posts.upvoteComment(post, comment);
		    // };
}])




.factory('posts',[function(){

	var o = {
		posts : [{title:'hello' , link:'dsf', comments: []}]
	};
	return o;

}])
