export function hasclass(el,className){
    return el.classList.contains(className)
}
export function addclass(el,className){
    return el.classList.add(className)
}
export function getData(el,name,val){
    const prifix = 'data-'
    name=prifix+name
    if(val){
        return el.setAttribute(name,val)
    }else{
        return el.getAttribute(name)
    }
}