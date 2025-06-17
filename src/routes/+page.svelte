<!-- src/routes/+page.svelte -->
<script>
  import CommentForm from "$lib/components/CommentForm.svelte";
  import CommentsList from "$lib/components/CommentsList.svelte";
</script>

<svelte:head>
  <title>ระบบคอมเม้นต์วิชาเรียน</title>
</svelte:head>

<main>
  <h1>ระบบคอมเม้นต์วิชาเรียน</h1>
  <CommentForm />
  <CommentsList />
</main>

<style>
  main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 40px;
  }
</style>
