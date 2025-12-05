let arrow = document.getElementById("arrow")
let panelhead = document.getElementById("panelhead")
let panel = document.getElementById("panel")
let sidepanel = document.getElementById("sidepanel")
let badge = document.getElementById("badge")
var data;
var assets;
async function load_data() {
    data = await fetch('http://127.0.0.1:3000/data.json');
    data = await data.json()
    render_sidepanel(data)
    render_projectheader(data)
    render_description(data)
}

function render_projectheader(data) {
    let title = data.title
    let project_title = document.getElementById("project_title")
    project_title.innerText = title

}
function render_description(data) {
    let title = data.tasks[0].task_title;
    let desc_title = document.getElementById('desc_title')
    desc_title.innerHTML = title

    let desc = data.short_description;
    let description = document.getElementById('desc')
    description.innerText = desc;
}

function render_sidepanel(data) {
    let tasktitle = document.getElementById("tasktitle")
    tasktitle.innerText = data.tasks[0].task_title
    
    assets = data.tasks[0].assets
    for (const asset of assets) {
        panel.innerHTML += `<li>${asset.asset_title}</li>`
    }
    
}

const sidepanel_action = async (e) => {
        if (arrow.style.rotate === '' || e.target.style.rotate === '0deg') {
            e.target.style.rotate = '180deg';
            sidepanel.style.width = '392px';
            panel.style.visibility = 'visible';
            panelhead.style.visibility = 'visible';
            badge.style.display = 'none'
        } else {
            e.target.style.rotate = '0deg';
            panel.style.visibility = 'hidden';
            panelhead.style.visibility = 'hidden';
            sidepanel.style.width = '132px';
            badge.style.display = 'flex'
        }    
}

async function main(){
    load_data()
    arrow.addEventListener('click', sidepanel_action)
}

main()