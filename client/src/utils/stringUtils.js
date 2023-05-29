// formats preview of post
export function formatPostPreview(content){
    
}

// formats follower count into a string
export function formatFollowers(followerCount){
    if(!followerCount || typeof followerCount !== 'number'){
        return `0 followers`
    } else if (followerCount === 1) {
        return "1 follower"
    } else {
        return `${followerCount} followers`
    }
}

// formats reading list post count into a string
export function formatReadingList(list){
    if(!list){
        return '0 posts'
    } else if (list.length === 1){
        return "1 post"
    } else {
        return `${list.length} posts`
    }
}


// Get initials from username
export function getInitials(name, props){
    const splitName = name.toUpperCase().split(" ")

    if(splitName.length === 1){
        const initial = splitName[0][0]
        return initial
    } else {
        const firstInitial = splitName[0][0]
        const lastInitial = splitName[1][0]
        return firstInitial + lastInitial
    }
}

// Get approximate time to finish reading
export function getReadingTime(html){
    const string = html.replace(/<[^>]*>?/gm, '').split(" ");
    const averageWordsPerMinute = 250;
    const time = Math.ceil(string.length / averageWordsPerMinute);

    return `${time} min read`

}