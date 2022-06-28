<script setup>
import { ref, watch } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';

const { result, loading, error } = useQuery(gql`
  query getAllTodos {
    todosSchema_todos {
      id
      title
    }
  }
`)

const { mutate: insertTodo } = useMutation(gql`
  mutation insertTodo($title: String!) {
  insert_todosSchema_todos_one(object: {title: $title}) {
    id
    title
  }
}
,
`, () => ({
  variables: {
    title: todo.value
  }
}))

const { mutate: deleteTodo } = useMutation(gql`
    mutation deleteTodo($id: uuid!) {
    delete_todosSchema_todos_by_pk(id: $id) {
      title
    }
  }

`)


const todo = ref('')

function addTodo() {
  insertTodo()
  window.location.reload()
}
function deleteTodos(id) {
  deleteTodo({ id })
  window.location.reload()
}

</script>


<template>

  <form @submit.prevent="addTodo" class="flex gap-2 justify-center align-middle w-[90%] mx-auto my-[2rem]">

    <input v-model="todo" type="text" class="px-2 border-2 outline-green-700 border-green-500 rounded-sm w-[50%]">
    <button type="submit" class="border-2 rounded-md px-4 py-2 bg-green-700 text-white">
      Add
    </button>
  </form>


  <div v-if="loading" class="grid place-content-center">
    <img src="./assets/Bars-1s-200px.svg" alt="">
  </div>
  <div v-else-if="error">Error occured {{ error }}</div>
  <div class="text-center font-bold text-3xl text-red-500" v-else-if="result.todosSchema_todos.length == 0">
    There's no todos available
  </div>
  <ul v-else class="flex flex-col-reverse gap-4">
    <li v-for="res in result.todosSchema_todos"
      class="p-4 shadow-sm flex justify-between w-[70%] mx-auto rounded-md bg-slate-700 text-white">
      {{ res.title }}
      <span>
        <span @click="deleteTodos(res.id)" class="btn">delete</span>
      </span>
    </li>
  </ul>

</template>
