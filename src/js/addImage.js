import { Dropzone } from 'dropzone'
import { param } from 'express-validator'

//Get token from meta tag
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

// Dropzone configuration
Dropzone.options.image = {
  dictDefaultMessage: 'Drop your image here!!',
  acceptedFiles: '.jpg, .png, .jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  headers:{
    'CSRF-Token': token
  },
  paramName: 'image',
  init: function(){
    const dropzone = this
    const btnPublish = document.querySelector('#btnPublish')

    btnPublish.addEventListener('click', function(){
      dropzone.processQueue()
    })

    dropzone.on('queuecomplete', function(){
      if(dropzone.getActiveFiles().length == 0) {
        window.location.href = '/my-properties'
      }
    })
  }
}