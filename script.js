const apiKey = '...',
    container = document.querySelector('.results-container');
let keyword, 
    language,
    page = 1,
    ready = true,
    newsArray = [],
    newsItems = document.getElementsByClassName("news-item");
    


async function getNews(page){
    loadedNews = 0;
    newsArray = [];
    try {       
        keyword = document.getElementsByClassName('keyword')[0].value;
        language = document.getElementsByClassName('language')[0].value;
        let url = `https://newsapi.org/v2/everything?q=${keyword}&language=${language}&from=2022-07-01&to=2022-07-07&sortBy=popularity&page=${page}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const apiNews = await response.json();
        newsArray.push(apiNews);
        return newsArray;
    }catch(error){
        console.log(error);
    }
}

async function showNews(page){
    newsArray = await getNews(page);
    newsArray[0]['articles'].forEach((ele) => {
        const item = document.createElement('div');
        item.className = "news-item";
        item.innerHTML = `<a href='${ele['url']}' target='_blank'><h3> ${ele['title']} </h3> <p>${ele['description']}</p></a>`
        container.appendChild(item);
    })
    ready = true;
    return true;
}

window.addEventListener('scroll', function(){
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -10 && ready){
        ready = false;
        page += 1;
        if(page <= 5){
            showNews(page);
        }
    }
})

document.getElementById('search').addEventListener('click', function(){
    document.querySelector('.modal').classList.remove('modal-add-out');
    document.querySelector('.choice-container').classList.remove('modal-add-in');
    if(newsItems){
        while(newsItems.length > 0){
            newsItems[0].parentNode.removeChild(newsItems[0]);
        }
    }
    showNews();
});

document.querySelector('input.keyword').addEventListener('click', function(){
    if(newsItems.length>0){
        document.querySelector('.modal').classList.add('modal-add-out');
        document.querySelector('.choice-container').classList.add('modal-add-in');
    }
})   

//dark and light mode
const toggleSwitch = document.querySelector('input[type="checkbox"]');
toggleSwitch.addEventListener('change', function(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.toggle-text').textContent = 'Dark Mode';
        localStorage.setItem('theme','dark');
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.toggle-text').textContent = 'Light Mode';
        localStorage.setItem('theme','light');
    }
})

//check the local storage for the theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        document.querySelector('.toggle-text').textContent = 'Dark Mode';
    }
}