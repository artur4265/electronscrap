// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


/*
var scraperjs = require('scraperjs');


scraperjs.StaticScraper.create('https://news.ycombinator.com/')
.scrape(function($) {
	return $(".title a").map(function() {
		return $(this).text();
	}).get();
})
.then(function(news) {
	console.log(news);
});
*/


var path = require('path');
var fs = require('fs');
var stream = require('stream');
//var read = require('fs').readFileSync;
var Xray = require('x-ray');
var serialize = require('form-serialize');
var x = Xray();

var wstream = fs.createWriteStream('myOutput.json');


window.$ = window.jQuery = require('jquery');



// DOM elements
const getstart = document.querySelector('#getstart');
const parser = document.querySelector('#parser');
const help = document.querySelector('#help');

var allinp;


const go_guide = document.querySelector('#go_guide');
const go_parser = document.querySelector('#go_parser');
const go_help = document.querySelector('#go_help');

const main_nav_links = document.querySelectorAll('#main_nav a');

const addButton = document.querySelector('#add');
const gruopInput = document.querySelectorAll('.gruop-input').lastChild;
const listcss = document.querySelector('#listcss');
var form = document.querySelector('#scrapform');

const scrap = document.querySelector('#scrap');
const resulrjson = document.querySelector('#resulrjson');

var url, cssSelector, cssParentSelector;


// Navigate Pages
go_parser.onclick = function() {
	parser.style.display = 'block';
	getstart.style.display = 'none';
	help.style.display = 'none';
}

go_help.onclick = function() {
	parser.style.display = 'none';
	getstart.style.display = 'none';
	help.style.display = 'block';
}

go_guide.onclick = function() {
	parser.style.display = 'none';
	getstart.style.display = 'block';
	help.style.display = 'none';
}




var names, selects, newField;












$('button#add').on('click', function() {

	name = $('#expando-mode-parent1').val();
	selects = $('#expando-mode-parent2').val();

	newField = `
	<li class="mdl-list__item gruop-input">
	<label >Scraping field <span class="liname">${name}</span></label>
	<input type="text" name="${name}" value="${selects}">


	<label class="array_on-lable">
	<input class="array_on" type="checkbox">
	<span class="mdl-checkbox__label">arr</span>
	</label>

	<span class="lidell">Delete</span>



	</li>`;

	$(newField).appendTo( $('#scrapform > ul') );


	$('li.gruop-input .lidell').on('click', function() {
		$(this).parents('li.gruop-input').detach();
	});

	$('#expando-mode-parent1').val('');
	$('#expando-mode-parent2').val('');



$('.array_on').on('change', function() {
    if(this.checked) {
		var arrname = $(this).parent('.array_on-lable').prev().attr('name');
		$(this).parent('.array_on-lable').prev().attr('name', arrname+'[]');
    } else {
    	var arrname1 = $(this).parent('.array_on-lable').prev().prev().find('.liname').text();
       $(this).parent('.array_on-lable').prev().attr('name', arrname1);
    }
});


});






var obj;


$('button#startparse').on('click', function() {


// 1 link

if ($('input#expando1').val() != '') {


	url = $('input#expando1').val();
	cssParentSelector = $('input#expando-mode-parent').val();
	obj = serialize(form, { hash: true });
	console.log(obj);



	if (obj == '') {

		x(url, cssParentSelector)(function(err, data) {
			if (data!='') {
  			console.log(data); //
  			resulrjson.innerHTML = data;
  		} else {
			console.log(err); //
		}
	});

	} else {
		x(url, cssParentSelector, [obj])(function(err, data) {
			if (data!='') {
  			console.log(data); //
  		} else {
			console.log(err); //
		}
	}).write('result.json');

	}

	obj = '';

// more links
} else if($('input#expando1').val() == ''&& $('#schools').val()!='') {


	url = $('#schools').val().split(', ');
	


url.forEach(function(link, ind) {

	
	cssParentSelector = $('input#expando-mode-parent').val();
	obj = serialize(form, { hash: true });
	console.log(obj);



	if (obj == '') {

		x(link, cssParentSelector)(function(err, data) {
			if (data!='') {
  			console.log(data); //
  			resulrjson.innerHTML = data;
  		} else {
			console.log(err); //
		}
	});

	} else {
		x(link, cssParentSelector, [obj])(function(err, data) {
			if (data!='') {
  			console.log(data); //
  		} else {
			console.log(err); //
		}
	})
  		.write('result.json');

		var text = fs.readFileSync('result.json', 'utf8');

		fs.open('myOutput.json', "a+", 0777, function(err, file_handle) {
			if (!err) {
			    fs.write(file_handle, text+'\n', null, 'utf8', function(err, written) {
			        if (!err) {
			            console.log("Текст успешно записан в файл");
			        } else {
			            console.log("Произошла ошибка при записи");
			        }
			    });
			} else {
				console.log("Произошла ошибка при открытии");
			}
		});

	}

	obj = '';


});




}


});



