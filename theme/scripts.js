// pretty date function
function prettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if (isNaN(day_diff) || day_diff < 0)
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
		day_diff > 31 && Math.round(day_diff / 31) + " months ago";
}

// search function
function search(search_val){
	var suche = search_val.toLowerCase();
	var table = document.getElementById("directory");
	var cellNr = 1;
	var ele;
	for (var r = 1; r < table.rows.length; r++){
		ele = table.rows[r].cells[cellNr].innerHTML.replace(/<[^>]+>/g,"");
		if (ele.toLowerCase().indexOf(suche)>=0 ) {
			table.rows[r].style.display = '';
		} else {
			table.rows[r].style.display = 'none';
		} 
	}
}

// manipulating the directory table after page load
if ($('tr:nth-child(2)').children('td:nth-child(2)').children('a').html()=='Parent Directory'){
	$('tr:nth-child(2)').addClass('parent');
}
$('tr').each(function(index){
	if (index != 0) {
		var date = $(this).children('td:nth-child(3)').html();
		date = prettyDate(date);
		$(this).children('td:nth-child(3)').html(date);
	}
});
$('td a').each(function(index){
	var link = $(this).attr('href');
	link = link.replace('.html', '');
	$(this).attr('href', link)
});
$('table').attr('id', 'directory');

// search script
if ($('input[name="filter"]').val()!=''){
	search($('input[name="filter"]').val());
}
$('input[name="filter"]').live('keyup', function(e){
	e.preventDefault();
	search($(this).val());
});
$('input[name="filter"]').live('keypress', function(e){
	if ( e.which == 13 ) {
		e.preventDefault();
	}
});

// clear input script
$('.clear').live('click', function(){
	$('input[name="filter"]').val('');
	search('');
});