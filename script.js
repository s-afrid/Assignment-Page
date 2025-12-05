let arrow = document.getElementById("arrow")
let panelhead = document.getElementById("panelhead")
let panel = document.getElementById("panel")
let sidepanel = document.getElementById("sidepanel")
let badge = document.getElementById("badge")
var data;
async function load_data() {
    data = await fetch('http://127.0.0.1:3000/data.json');
    data = await data.json()
    render_sidepanel(data)
}

function render_sidepanel(data) {
    let tasktitle = document.getElementById("tasktitle")
    tasktitle.innerText = data.tasks[0].task_title
    
}

function sidepanel_action() {
    arrow.addEventListener('click',async (e)=>{
        

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
        
    })    
}

async function main(){
    load_data()
    sidepanel_action()
}

main()