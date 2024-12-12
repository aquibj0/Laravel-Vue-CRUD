<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

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

        return Post::create($request->all());
    }

    public function show(Post $post){
        return $post;
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
}
