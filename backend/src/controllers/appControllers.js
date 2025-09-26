export function getAllApps(req, res){
    res.status(200).send("Refreshed Page");
}

export function createPost(req, res){
    res.status(200).json({message:"Post created successfully!"});
}

export function updatePost(req, res){
    res.status(200).json({message:"Post updated successfully"});
}

export function deletePost(req, res){
    res.status(200).json({message:"Post deleted successfully"});
}
