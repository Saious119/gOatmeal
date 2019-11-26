import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoClient; 
import com.mongodb.MongoCredential;  

public class Home { 
   
   public static void main( String args[] ) throws IOException {  
      
	 //Enter data using BufferReader 
       BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
	   
      // Creating a Mongo client 
      MongoClient mongo = new MongoClient( "localhost" , 27017 ); 
   
      // Creating Credentials 
      MongoCredential credential; 
      credential = MongoCredential.createCredential("sampleUser", "myDb", 
         "password".toCharArray()); 
      System.out.println("Connected to the database successfully");  
      
      // Accessing the database 
      MongoDatabase database = mongo.getDatabase("myDb"); 
      System.out.println("Credentials ::"+ credential);
      
      //Creating a collection 
      System.out.println("Collection created successfully"); 
      
      // Retieving a collection
      MongoCollection<Document> collection = database.getCollection("myCollection"); 
      System.out.println("Collection myCollection selected successfully"); 
      
      String keepGoing = "";
      String currentSection = "";
      int idCounter = 0;
      while(!keepGoing.equals("STOP")) {
    	  keepGoing = "";
    	  currentSection = "";
    	  
    	  System.out.println("Enter the name of your recipe: ");
    	  String recipeTitle = reader.readLine(); 
    	  
    	  idCounter++;
    	  
    	  System.out.println("Enter the ingredients of your recipe: ");
    	  ArrayList<String> ingredients = new ArrayList<String>();
    	  ingredients.clear();
    	  while(!currentSection.equals("STOP")) {
    		  currentSection = reader.readLine();
    		  if(currentSection.equals("STOP")) {
    			  break;
    		  }
    		  else {
    			  ingredients.add(currentSection);
    		  }
    		  System.out.println("If you are done entering ingredients enter STOP otherwise enter next ingredient: ");
    		  
    	  }
    	  currentSection = "";
    	  
    	  System.out.println("Enter the steps of your recipe: ");
	      ArrayList<String> steps =  new ArrayList<String>();
	      steps.clear();
    	  while(!currentSection.equals("STOP")) {
    		  currentSection = reader.readLine();
    		  if(currentSection.equals("STOP")) {
    			  break;
    		  }
    		  else {
    			  steps.add(currentSection);
    		  }
    		  System.out.println("If you are done entering steps enter STOP otherwise enter next ingredient: "); 
    	  }
    	  currentSection = "";

    	  System.out.println("Enter the tags of your recipe: ");
	      ArrayList<String> tags = new ArrayList<String>();
    	  while(!currentSection.equals("STOP")) {
    		  currentSection = reader.readLine();
    		  if(currentSection.equals("STOP")) {
    			  break;
    		  }
    		  else {
    			  tags.add(currentSection);
    		  }
    		  System.out.println("If you are done entering tags enter STOP otherwise enter next ingredient: "); 
    	  }
    	  currentSection = "";
	      
    	  System.out.println("Enter a discription for your recipe: "); 
    	  currentSection = reader.readLine();
    	  String recipeDescription = currentSection;
    	  currentSection = "";
    	  
    	  
	      Document document = new Document("title", recipeTitle)
	      .append("id", 1)
	      .append("Ingredients", ingredients) 
	      .append("cookingSteps", steps ) 
	      .append("tags", tags) 
	      .append("description", recipeDescription);  
	      collection.insertOne(document); 
	      System.out.println("Document inserted successfully"); 
	      
	      System.out.println("If you are finished entering recipes type STOP otherwise enter anything to start the next recipe: "); 
	      keepGoing = reader.readLine();
	      
      }
      
      // Getting the iterable object 
      FindIterable<Document> iterDoc = collection.find(); 
      int i = 1; 

      // Getting the iterator 
      Iterator it = iterDoc.iterator(); 
    
      while (it.hasNext()) {  
         System.out.println(it.next());  
         i++; 
      }
      
   } 
}