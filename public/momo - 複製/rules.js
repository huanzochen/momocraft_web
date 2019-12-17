function init(){
    $.get('rules.json').done(function(json){
    
    var select;    
    var typer = ["一般","領地","聊天室"];    
    rules = json;  
    console.log(json.一般[1]);
    console.log(typer[1]);
    
    drawtable(typer);
    
    
    });
}
function drawtable(select){
        
    var tr = $('<tr>').text(select[0]);
    var tbody = $('<tbody>').append(tr);
    $('#rules').append(tbody);
    for(var i =0;i<rules.一般.length;i++){
        var tr1 = $('<tr>').text((i+1)+"."+rules.一般[i]);
        var tbody = $('<tbody>').append(tr1);
        $('#rules').append(tbody);
    }
    
    var tr = $('<tr>').text(select[1]);
    var tbody = $('<tbody>').append(tr);
    $('#rules').append(tbody);
    for(var i =0;i<rules.領地.length;i++){
        var tr1 = $('<tr>').text((i+1)+"."+rules.領地[i]);
        var tbody = $('<tbody>').append(tr1);
        $('#rules').append(tbody);
    }  
    
    var tr = $('<tr>').text(select[2]);
    var tbody = $('<tbody>').append(tr);
    $('#rules').append(tbody);
    for(var i =0;i<rules.聊天室.length;i++){
        var tr1 = $('<tr>').text((i+1)+"."+rules.聊天室[i]);
        var tbody = $('<tbody>').append(tr1);
        $('#rules').append(tbody);
    }  
   
    
    
}




init();