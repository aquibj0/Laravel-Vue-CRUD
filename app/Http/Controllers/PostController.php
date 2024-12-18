<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(){
        return Post::all();
    }

    public function store(Request $request){
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);

        return Post::create([
            'title' => $request['title'],
            'content' => $request['content'],
            'user_id' => $request['user_id']
        ]);
    }

    public function show($id){

        $post = Post::findOrFail($id);

        return response()->json($post);

    }

    public function update(Request $request, Post $post){
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);

        $post->update($request->all());
        return $post;
    }

    public function destroy(Post $post){
        $post->delete();
        return response()->noContent();
    }


    public function userPost($id){
        if(Auth::check()){
            $posts = Post::where('user_id', $id)->get();
            return response()->json([
                'message' => 'Success',
                'posts' => $posts,
            ], 201);
        }
        return response()->json([
            'message' => 'Unauthorized'
        ],401);

    }
}
