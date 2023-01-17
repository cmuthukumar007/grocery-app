
<template>
   <div class="app">
    <div class="row" style="font-family: 'Nunito', sans-serif;
  color: #384047;">
      <div class="col-md-12">
    <form v-on:submit="onSubmit">
          <h1> Add Items </h1>
          <fieldset>
            <label style="text-align: left;" for="category">Category:</label>
            <input
          type="category"
          id="category"
          v-model="formData.category"
          @input="validateForm"
          placeholder="category"
         
          
        />
        <p v-if="formErrorData.category" class="form-group-error">
          {{ formErrorData.category }}
        </p>
            
             <label style="text-align: left;" for="name">Name:</label>
             <input
          type="name"
          id="name"
          v-model="formData.name"
          @input="validateForm"
          placeholder="Name"
         
        
        />
        <p v-if="formErrorData.name" class="form-group-error">
          {{ formErrorData.name }}
        </p>
            
            <label style="text-align: left;" for="name">Quantity:</label>
            <input
          type="number"
          id="groceryQuantity"
          v-model="formData.quantity"
          placeholder="Enter Grocery Quantity"
          min="0"
          step=any
          @keypress="numberOnly"
          @input="validateForm"
        
        />
        <p v-if="formErrorData.quantity" class="form-group-error">
          {{ formErrorData.quantity }}
        </p>
            </fieldset>
          <button type="submit" class="button">Submit</button>
          <button @click="cancel()" class="button button3" type="button">cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import{ref} from "vue";
import { useRouter } from "vue-router";
import { localstoragekeys } from "@/common";
const router =useRouter();
const getTableData = () =>{
  const result = localStorage.getItem(localstoragekeys.productList);
  if(result){
     return JSON.parse(result);
  }
  return []
}

const formData =ref<any>({});
const formErrorData = ref<any>({});
const submitTried = ref(false);

const validateForm = (e:any = null) =>{
  if(e) {
    e.preventDefault();
  }
  let check = true;
  if(submitTried.value) {
    formErrorData.value.category = "";
    formErrorData.value.name = "";
    formErrorData.value.quantity = "";
    if((formData.value.category || "").length === 0)
      formErrorData.value.category = "Please enter a category"
    if((formData.value.name || "").length === 0)
      formErrorData.value.name = "Please select a Name"
    if((formData.value.quantity || "").length === 0)
      formErrorData.value.quantity = "Please enter a quantity"

if(formErrorData.value.category ||formErrorData.value.name ||formErrorData.value.quantity ) 
check =false;
return check;
  }
};

const onSubmit = (e : any)=>{
e.preventDefault();

if(!submitTried.value) submitTried.value=true;

if (validateForm()){
const tableData = getTableData();
const NewProduct = {
  ...formData.value,
  id : String(tableData.length),
  createdAt: new Date(),
  modifiedAt: null,

};
tableData.unshift(NewProduct);
console.log(tableData)
localStorage.setItem(localstoragekeys.productList, JSON.stringify( tableData));
router.push('/')
}

}


const numberOnly = (e:any) => {
  const pattern = /[0-9]/;
  if(!pattern.test(e.key)) e.preventDefault();
}
const cancel = () => {
  router.push('/')
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;    
    margin-top: 60px;
    }  
  table, th, td {
    border:1px solid black;    
  }
    .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }  
  .button2 {background-color: #008CBA;} /* Blue */
  .button3 {background-color: #f44336;} /* Red */   
  form {
    max-width: 300px;
    margin: 10px auto;
    padding: 10px 20px;
    background: #f4f7f8;
    border-radius: 8px;
  } 
  h1 {
    margin: 0 0 30px 0;
    text-align: center;
  }  
  input[type="category"],
  input[type="name"],
  input[type="number"],
  select {
    background: rgba(255,255,255,0.1);
    border: none;
    font-size: 16px;
    height: auto;
    margin: 0;
    outline: 0;
    padding: 15px;
    width: 100%;
    background-color: #e8eeef;
    color: #8a97a0;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
    margin-bottom: 30px;
  }  
  input[type="radio"],
  input[type="checkbox"] {
    margin: 0 4px 8px 0;
  }  
  select {
    padding: 6px;
    height: 32px;
    border-radius: 2px;
  }  
  fieldset {
    margin-bottom: 30px;
    border: none;
  }  
  label {
    display: block;
    margin-bottom: 8px;
  }  
  label.light {
    font-weight: 300;
    display: inline;
  }  
  .number {
    background-color: #5fcf80;
    color: #fff;
    height: 30px;
    width: 30px;
    display: inline-block;
    font-size: 0.8em;
    margin-right: 4px;
    line-height: 30px;
    text-align: center;
    text-shadow: 0 1px 0 rgba(255,255,255,0.2);
    border-radius: 100%;
  }  
    form {
      max-width: 480px;
    }
.form-group-error{
  color:#f44336
}
.form-control-feedback {
  margin-top: 0.25rem;
    color: #f0ad4e;
}
</style>