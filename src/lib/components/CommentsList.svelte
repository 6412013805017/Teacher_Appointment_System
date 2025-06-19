<!-- src/lib/components/CommentsList.svelte -->
<script>
  import { onMount } from 'svelte';
  import { getComments } from '$lib/commentService.js';

  let comments = [];
  let loading = true;
  let selectedSubject = '';
  
  const subjects = ['ทั้งหมด', 'Creative Class', '167-ธุรกิจ Online', 'หลักการโปรแกรมคอมพิวเตอร์ทางธุรกิจและเทคโนโลยีดิจิทัล', '267-การจัดการฐานข้อมูล', 'การพัฒนาแอพพลิเคชั่นทางธุรกิจ'];

  onMount(async () => {
    await loadComments();
  });

  async function loadComments() {
    try {
      loading = true;
      const result = await getComments();
      if (result.success) {
        comments = result.data.reverse(); // ล่าสุดก่อน
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      loading = false;
    }
  }

  $: filteredComments = selectedSubject && selectedSubject !== 'ทั้งหมด' 
    ? comments.filter(c => c.subject === selectedSubject)
    : comments;

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStars(rating) {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }
</script>

<div class="comments-list">
  <h2>ความคิดเห็นจากนักเรียน</h2>
  
  <div class="filter">
    <label for="subject-filter">กรองตามวิชา:</label>
    <select id="subject-filter" bind:value={selectedSubject}>
      {#each subjects as subject}
        <option value={subject}>{subject}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="loading">กำลังโหลด...</div>
  {:else if filteredComments.length === 0}
    <div class="no-comments">ยังไม่มีความคิดเห็น</div>
  {:else}
    <div class="comments">
      {#each filteredComments as comment}
        <div class="comment-card">
          <div class="comment-header">
            <div class="user-name">{comment.displayName}</div>
            <div class="subject-tag">{comment.subject}</div>
            <div class="timestamp">{formatDate(comment.timestamp)}</div>
          </div>
          <div class="rating">{getStars(comment.rating)}</div>
          <div class="comment-text">{comment.comment}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  h2 {
    text-align: center;
  }
  .comments-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Sarabun', sans-serif;
  }
  
  .filter {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

  }
  
  .filter select {
    padding: 8px;
    border: 2px solid #ddd;
    border-radius: 4px;
  }
  
  .loading, .no-comments {
    text-align: center;
    padding: 40px;
    color: #666;
  }
  
  .comment-card {
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .user-name {
    font-weight: bold;
    color: #333;
  }
  
  .subject-tag {
    background: #06c755;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
  
  .timestamp {
    color: #666;
    font-size: 12px;
  }
  
  .rating {
    margin-bottom: 8px;
    font-size: 18px;
  }
  
  .comment-text {
    color: #333;
    line-height: 1.5;
  }
</style>