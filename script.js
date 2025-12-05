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
    render_projectheader(data)
    render_description(data)
    render_assets(data)
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

function render_assets(data) {
    let assets = data.tasks[0].assets
    let asset_container = document.getElementsByClassName("asset_container")[0];
    
    for (const asset of assets) {
        asset_container.innerHTML += `
        <div class="asset" data-content="${asset.asset_content_type}" data-type="${asset.asset_type}" data-src="${asset.asset_content}">
            <div class="asset_title">
              <p style="width: 95%; text-align: center; font-size: 16px; font-weight: 600;">${asset.asset_title}</p>
              <img src="assets/info.svg" alt="info">
            </div>
            <div class="asset_description">
              <div class="desc_content">
                <span style="font-weight: 500;">Description:</span>
                <span>${asset.asset_description}</span>
              </div>
              <img class="expand" src="assets/expand.svg" alt="expand">
            </div>
        </div>
        `
    }

    let all_assets = asset_container.children
    for (const asset of all_assets) {
        const list = asset.dataset
        
        if(list.type === 'display_asset') {
            if(list.content === 'video'){
                asset.innerHTML += `
                <div class="asset_content">
                  <iframe class="video" src=${list.src} frameborder="0"></iframe>
                </div>
                `
            } else if (list.content === 'article') {
                asset.innerHTML += `
                <div class="asset_content">
                  <iframe class="article" src=${list.src} frameborder="0"></iframe>
                </div>
                `
            }
        } else if(list.type === 'input_asset') {
            asset.innerHTML += `
                <div class="asset_content">
                  <form class="input_content">
                    <label for="title">Title</label>
                    <input type="text" name="title"/>
                    <label for="content">Content</label>
                    <textarea name="content" row="100" column="20">
                    </textarea>
                  </form>
                </div>
            `
        }
    }

    let expand_btns = document.getElementsByClassName("expand")
    for(let btn of expand_btns){
        btn.addEventListener('click', expand_action)
    }
}

function render_sidepanel(data) {
    let tasktitle = document.getElementById("tasktitle")
    tasktitle.innerText = data.tasks[0].task_title
    
    let assets = data.tasks[0].assets
    for (const asset of assets) {
        panel.innerHTML += `<li>${asset.asset_title}</li>`
    }
}

const sidepanel_action = async (e) => {
    if (e.target.style.rotate === '' || e.target.style.rotate === '0deg') {
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

const expand_action = async (e) => {
    let content = e.target.previousElementSibling
    if (e.target.style.rotate === '' || e.target.style.rotate === '0deg') {
        e.target.style.rotate = '180deg';
        content.style.display = 'none'
    } else {
        e.target.style.rotate = '0deg';
        content.style.display = 'block'
    }    
}

async function main(){
    load_data()
    arrow.addEventListener('click', sidepanel_action)
}

main()