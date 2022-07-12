This scrollable news api is a multi functions webpage with vanilla javascript.

By inserting the keyword in the search bar we make an API call to "newsapi.org" and you can search the news about the keyword you searched for.

You can select the languages from the options which you can set as the select option in the index.html like
```
	
    Language :
    <select name="language" id="language" class="language">
        <option value="nl">Dutch</option>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="fr">French</option>
        <option value="it">Italian</option>
      </select>


```

You can also set the search date period by changing the url element in script.js 

` let url = `https://newsapi.org/v2/everything?q=${keyword}&language=${language}&from=2022-07-01&to=2022-07-07&sortBy=popularity&page=${page}&apiKey=${apiKey}`; `

To avoid an overload of information and to make the page faster it is set to make an API call only when the page scroll is almost at the bottom of the page.


### Additional functionality ###
By clicking the dark / light button on the right top corner you can select the mode. 
The colors are set by using root element in style.css 
This theme mode is saved in local storage so that when you visit this page again first we look if the theme is already set for you. 
