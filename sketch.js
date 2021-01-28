//Create variables here
var  dog, happyDog, database, foodS, foodStock, readStock;
var doggoI1, doggoI2
var feed, addFood
var food
var hour
var lastFed

function preload()
{
  //load images here
  
  doggoI1 = loadImage("dogImg.png")
  doggoI2 = loadImage("dogImg1.png")


}

function setup() {

  database=firebase.database();
  console.log(database);

	createCanvas(500, 500);
  
foodStock = database.ref("food");
foodStock.on("value",  function(data){

  foodS = data.val();
  food.updateFoodStock(foodS);
  
  }) ;
dog = createSprite(250, 370, 10, 10);
dog.addImage(doggoI1);
dog.scale = 0.2

feed = createButton("feed the doggo!!")
feed.position(350, 20)
feed.mousePressed(feedDog);

addFood = createButton("add food")
addFood.position(450, 20);
addFood.mousePressed(addFoods)

food = new Food();

}


function draw() {  

  background(46, 139, 87);


fill(255, 255, 254);
textSize(15)
if(lastFed>=12){

text("last fed: "+ lastFed%12+"PM", 350, 30);

}

else if(lastFed===0){

  text("last fed: 12 AM", 350, 30);

}
else{

text("last fed: "+ lastFed+"AM", 350, 30)

}

hour = database.ref("feedTime")
hour.on("value", function(data){

  lastFed = data.val();

})

food.display();
  drawSprites();
  //add styles here

}




function feedDog(){

dog.addImage(doggoI1)
 

food.deductFood();
//imp 95
database.ref("/").update({

feedTime: hour(),
food:food.getFoodStock()

})

}

function addFoods(){

foodS++
database.ref("/").update({

food : foodS

})  

}
