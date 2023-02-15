export function formatPath(s: string) {
    return s.replace(/\s/g, '-').toLowerCase();
}

export function formatTitle(root: string, sub?: string){
    if(!sub) return root;
    return `${root} - ${sub}`;
}

export function formatTime(time: Date){
    const hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    return `${hour}:${min < 10 ? `0${min}`: min}:${sec < 10 ? `0${sec}` : sec}`;
}