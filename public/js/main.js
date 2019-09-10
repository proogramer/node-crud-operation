$(document).ready(function(){

   $('.delete-article').on('click',function(e){
       $target = $(e.target);
       const id= $target.attr('data-id');
       var r = confirm("Do you want to delete this article");
       if (r === true) {
           $.ajax({
               type: 'DELETE',
               url: '/article/delete/' + id,
               success: function (response) {
                   alert('deleteing article');
                   window.location.href = '/';
               },
               error: function (err) {
                   console.log(err);
               }
           });
       }
    });
});