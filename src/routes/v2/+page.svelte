<script>
  import CommentForm from '$lib/components/CommentForm.svelte';
  import CommentsList from '$lib/components/CommentsList.svelte';

  let selectedSubject = '';
  let subjects = ['ทั้งหมด', 'คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาอังกฤษ'];
</script>

<svelte:head>
  <title>ระบบคอมเม้นต์วิชาเรียน</title>
</svelte:head>

<main>
  <div class="container">
    <h1>ระบบคอมเม้นต์วิชาเรียน</h1>

    <section class="section">
      <!-- ย้าย CommentForm มารวม -->
      <CommentForm />

      <!-- กรองตามวิชา: ใช้แค่ครั้งเดียว -->
      <div class="filter">
        <label for="subject">กรองตามวิชา:</label>
        <select id="subject" bind:value={selectedSubject}>
          {#each subjects as subject}
            <option>{subject}</option>
          {/each}
        </select>
      </div>

      <!-- แสดงความคิดเห็น -->
      <CommentsList subject={selectedSubject} />
    </section>
  </div>
</main>

<style>
  :global(body, html) {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fafb;
  }

  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 32px 16px;
  }

  .container {
    width: 100%;
    max-width: 800px;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 24px;
    color: #2c3e50;
  }

  .section {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 32px;
    text-align: center;
  }

  .filter {
    margin: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  select {
    padding: 8px 12px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  @media (max-width: 600px) {
    .section {
      padding: 16px;
    }

    .filter {
      flex-direction: column;
    }
  }
</style>
