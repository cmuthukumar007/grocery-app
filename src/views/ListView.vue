
<template>
  <div class="app">

   
 
      <h1 style="color:black">
Grocery Products
</h1>
<button style="float: right;" @click="addProduct" class="button " type="button">Add</button>   
   
    <div >
      <main>
<table>
  <thead>
  <tr>
    <th>category</th>
    <th>Name</th>
    <th>Quantity</th>     
    <th>Actions</th>     
  </tr>
</thead>
<tbody>
  <tr v-for="(product, index) in tableData" :key="index">
    <td data-title='Category'>{{product?.category}}</td>
    <td data-title='Item Name'>{{product?.name}}</td>
    <td data-title='Quantity'>{{product?.quantity}}</td>
    <td data-title='Actions' style="text-align: center;">
      <!-- <router-link :to="{name: 'edit', params: {id : product?.createid}}"> -->
    <button  class="button button2" @click="editValue(product)" type="button" >Edit</button>
    <!-- </router-link>     -->
      <button class="button button3" type="button" @click="deleteValue(product)">Delete</button></td>
     
  </tr>
</tbody>
</table>
</main>
</div>
 </div>  
</template>  
<script setup lang="ts">  
import { defineComponent } from 'vue'
import { ref } from 'vue';
import {localstoragekeys} from '@/common'
import { useRouter } from 'vue-router';

interface formValues{
        id: string,
        category: string;
        name:string;
        quantity:  string;
        createAt: Date;
        modifiedAt: Date,
}

const getTableData = () =>{
  const result = localStorage.getItem(localstoragekeys.productList);
  if(result) return JSON.parse(result);

  return []
};

 const tableData = ref<formValues[]>(getTableData());

const router = useRouter();


const deleteValue = (product: formValues) => {
  
  if(window.confirm(`Are you sure you want to delete ${product.name} ?`)) {
    const oldTableData = getTableData();
    const newTableData  = oldTableData.filter(
      (item: any) => String(item.id) !== String(product.id)
    )
    localStorage.setItem(localstoragekeys.productList, JSON.stringify(newTableData))
    tableData.value = getTableData()
  }
}
const editValue = (product: formValues) => {
  
router.push(`/edit/${product.id}`)
}

const addProduct =()=>{
  router.push("/add")
}

</script>
<style>
   * {
box-sizing: border-box;
}

html.open, body.open {
height: 100%;
overflow: hidden;
}

html {
padding: 40px;
font-size: 62.5%;
}

body {
padding: 20px;
background-color: #ffffff;
line-height: 1.6;
-webkit-font-smoothing: antialiased;
color: #fff;
font-size: 1.6rem;
font-family: 'Lato', sans-serif;
}

p {
text-align: center;
margin: 20px 0 60px;
}

main {
background-color: #2C3845;
}

h1 {
text-align: center;
font-weight: 300;
}

table {
display: block;
}

tr, td, tbody, tfoot {
display: block;
}

thead {
display: none;
}

tr {
padding-bottom: 10px;
}

td {

text-align: center;
}
td:before {
content: attr(data-title);
color: #7a91aa;
text-transform: uppercase;
font-size: 1.4rem;
padding-right: 10px;
display: block;
}

table {
width: 100%;
}

th {
text-align: center;
font-weight: 700;
}

thead th {
background-color: #202932;
color: #fff;
border: 1px solid #202932;
}

tfoot th {
display: block;
padding: 10px;
text-align: center;
color: #b8c4d2;
}



.select {
padding-bottom: 20px;
border-bottom: 1px solid #28333f;
}
.select:before {
display: none;
}

.detail {
background-color: #BD2A4E;
width: 100%;
height: 100%;
padding: 40px 0;
position: fixed;
top: 0;
left: 0;
overflow: auto;
-moz-transform: translateX(-100%);
-ms-transform: translateX(-100%);
-webkit-transform: translateX(-100%);
transform: translateX(-100%);
-moz-transition: -moz-transform 0.3s ease-out;
-o-transition: -o-transform 0.3s ease-out;
-webkit-transition: -webkit-transform 0.3s ease-out;
transition: transform 0.3s ease-out;
}
.detail.open {
-moz-transform: translateX(0);
-ms-transform: translateX(0);
-webkit-transform: translateX(0);
transform: translateX(0);
}

.detail-container {
margin: 0 auto;
padding: 40px;
max-width: 500px;
}

dl {
margin: 0;
padding: 0;
}

dt {
font-size: 2.2rem;
font-weight: 300;
}

dd {
margin: 0 0 40px 0;
font-size: 1.8rem;
padding-bottom: 5px;
border-bottom: 1px solid #ac2647;
box-shadow: 0 1px 0 #c52c51;
}

.close {
background: none;
padding: 18px;
color: #fff;
font-weight: 300;
border: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 4px;
line-height: 1;
font-size: 1.8rem;
position: fixed;
right: 40px;
top: 20px;
-moz-transition: border 0.3s linear;
-o-transition: border 0.3s linear;
-webkit-transition: border 0.3s linear;
transition: border 0.3s linear;
}
.close:hover, .close:focus {
background-color: #a82545;
border: 1px solid #a82545;
}

@media (min-width: 460px) {
td {
  text-align: left;
}
td:before {
  display: inline-block;
  text-align: right;
  width: 140px;
}

.select {
  padding-left: 160px;
}
}
@media (min-width: 720px) {
table {
  display: table;
}

tr {
  display: table-row;
}

td, th {
  display: table-cell;
  
}

tbody {
  display: table-row-group;
}

thead {
  display: table-header-group;
}

tfoot {
  display: table-footer-group;
}

td {
  border: 1px solid #28333f;
}
td:before {
  display: none;
}

td, th {
  padding: 10px;
}

tr:nth-child(2n+2) td {
  background-color: #242e39;
}

tfoot th {
  display: table-cell;
}

.select {
  padding: 10px;
}
}

</style>