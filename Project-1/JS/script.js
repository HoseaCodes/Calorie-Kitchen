let foodData, foodSelection;

const $readyInMinutes = $('.readyInMinutes')
const $input = $("input[id='search']")
const $videoInput = $("input[id='videoInput']")
const $select = $("select[id='select']")

let $td = $(".table")
let $name = $('#name')
let $orginial = $('#orginial')
let $amount = $('#amount')
let $unit = $('#unit')
let $image = $('#lost')

$select.change(function() {
    $input.val(''); 
    getSelection();
})


// Generates the API Search for the image and places it inside the output div
function getrecepe(event){
    
    
    // let searchSelection;
    userInput = $input.val();
    // foodSelection = $select.val();
    // console.log(`food selection is`,foodSelection);
    // if (userInput){
        //     searchSelection = userInput
        // } else if (foodSelection) {
            //     searchSelection = foodSelection
            // }
            
            // console.log(searchSelection);
            
            $.ajax({
                url:`https://api.spoonacular.com/recipes/search?apiKey=${config.RECIPE_API_KEY}&number=1&query=${userInput}`,
                success: function(res) {
                    
                    let minuteString = mintueCoversation(res.results[0].readyInMinutes)
                    document.getElementById("output").innerHTML="<h5>"+res.results[0].title+"</h5><br><img src='"+res.baseUri+res.results[0].image+"' width='100%' /><br>Ready in "+minuteString
    getsource(res.results[0].id)
    getSelection(res.results[0].id)

    // console.log(getrecepe);
}
});
}


function getSelection(id){
    
    foodSelection = $select.val();
   
    
        $.ajax({
        url:`https://api.spoonacular.com/recipes/723984/information?apiKey=${config.RECIPE_API_KEY}&query=${foodSelection}`,
        success: function(res) {
        
        foodData = res;
        render();
        const td = document.createElement('td');
        $td.append(`<td><button class="delete"></button>${render}</td>`);
   
        }
        });
        $('td').on('click', 'button', function () {
            console.log(this);
            $(this).closest('td').remove();
        })
        }
 

    function render () {
        $name.html(foodData.extendedIngredients[0].name)
        $orginial.html(foodData.extendedIngredients[0].originalString)
        $amount.html(foodData.extendedIngredients[0].amount+" "+foodData.extendedIngredients[0].unit)
        $image.html(foodData.image)
        // document.getElementById('image').src=foodData.image
        // $image.html(foodData.image)

    }
        

function getJokes(){
    $.ajax({
        url: `https://api.spoonacular.com/food/jokes/random?apiKey=${config.RECIPE_API_KEY}`,
    success: function(res){
        document.getElementById("foodJoke").innerHTML="<div id='generatedJoke'>"+res.text+"</div>"
        console.log(res);
    }
    })
}
// Had to comment this out because it will immedately start the functions
// getJokes();
// console.log(getJokes);


function getVideos() {
    
    videoSearch = $videoInput.val();
    $.ajax({
        url: `https://api.spoonacular.com/food/videos/search?apiKey=${config.RECIPE_API_KEY}&query=${videoSearch}`,
        success: function(res){
            document.getElementById("video").src=`https://www.youtube.com/embed/`+res.videos[0].youTubeId            

        },
        error: function(error){
            console.log(error);
        }
    })
 }
    

//Generates the original source point with the ID for info.
function getsource(id){
    event.preventDefault();

    $.ajax({
    url:`https://api.spoonacular.com/recipes/${id}/information?apiKey=${config.RECIPE_API_KEY}`,
    success: function(res) {
    
    document.getElementById("sourceLink").innerHTML=res.sourceUrl
    document.getElementById("sourceLink").href=res.sourceUrl

    }
    });
    }

//Converts the mintues to hours and minutes.
    function mintueCoversation(n) {
        console.log(n);
        var num = n;
        var hours = num / 60;
        var rHours = Math.floor(hours);
        var minutes = (hours - rHours) * 60;
        var rMinutes = Math.round(minutes);
        return rHours + " hour(s) and " + rMinutes + " minute(s).";
    }



// Removes the option to click the Logo Image
    $('a').on('click', function(event) {
        event.preventDefault();
      });

     // document.ready(function(){
    //     $('#select').change(function(){
    //     document.getElementById("diet").innerHTML="<li>"+res.extendedIngredients[0].name+"</li><br><li>"+res.extendedIngredients[0].originalName+"</li><br><li>"+res.extendedIngredients[0].amount+" "+res.extendedIngredients[0].unit+"</li><br><li>"+res.measures[0].amount+" "+res.measures[0].unitLong+"</li><br><img src='"+res.measures[0].extendedIngredients.image+"' width='400' /><br>"
    //   });
      
   
