// Vue的插件一定暴露一个对象
let myPlugins ={}

myPlugins.install =function(Vue,option ){
    Vue.directive(option.name,(element,params)=>{
        element.innerHtml = params.value.toUpperCase()
    })
}

export  default myPlugins;