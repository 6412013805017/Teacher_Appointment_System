<!-- src/lib/components/CommentForm.svelte -->
<script>
  import { onMount } from "svelte";
  import { userProfile, initializeLiff, login } from "$lib/liff.js";
  import { addComment } from "$lib/commentService.js";
  import { sendLineMessage } from "$lib/liff.js";

  let subject = "";
  let comment = "";
  let rating = 5;
  let subjects = [
    "Creative Class",
    "167-ธุรกิจ Online",
    "หลักการโปรแกรมคอมพิวเตอร์ทางธุรกิจและเทคโนโลยีดิจิทัล",
    "267-การจัดการฐานข้อมูล",
    "การพัฒนาแอพพลิเคชั่นทางธุรกิจ",
  ];

  onMount(async () => {
    await initializeLiff('');
  });

  async function handleSubmit() {
    if (!$userProfile) {
      await login();
      return;
    }

    if (!subject || !comment.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const commentData = {
        userId: $userProfile.userId,
        displayName: $userProfile.displayName,
        subject,
        comment: comment.trim(),
        rating,
      };

      const result = await addComment(commentData);

      if (result.success) {
        // แจ้งเตือนใน LINE
        // sendLineMessage(
        //   `✅ ส่งคอมเม้นต์เรียบร้อย!\n` +
        //     `📚 วิชา: ${subject}\n` +
        //     `⭐ คะแนน: ${rating}/5\n` +
        //     `💬 ความคิดเห็น: ${comment}`,
        // );

        // รีเซ็ตฟอร์ม
        subject = "";
        comment = "";
        rating = 5;

        alert("ส่งคอมเม้นต์เรียบร้อย!");
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  }
</script>

<div class="comment-form">
  <h2>แสดงความคิดเห็นเกี่ยวกับวิชาเรียน</h2>

  {#if $userProfile}
    <div class="user-info">
      <img src={$userProfile.pictureUrl} alt="Profile" />
      <span>สวัสดี {$userProfile.displayName}</span>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="subject">เลือกวิชา:</label>
        <select id="subject" bind:value={subject} required>
          <option value="">-- เลือกวิชา --</option>
          {#each subjects as subj}
            <option value={subj}>{subj}</option>
          {/each}
        </select>
      </div>

      <div class="form-group">
        <label for="rating">คะแนนความพึงพอใจ:</label>
        <div class="rating">
          {#each [1, 2, 3, 4, 5] as star}
            <button
              type="button"
              class="star {star <= rating ? 'active' : ''}"
              on:click={() => (rating = star)}
            >
              ⭐
            </button>
          {/each}
          <span>{rating}/5</span>
        </div>
      </div>

      <div class="form-group">
        <label for="comment">ความคิดเห็น:</label>
        <textarea
          id="comment"
          bind:value={comment}
          placeholder="แสดงความคิดเห็นเกี่ยวกับวิชานี้..."
          rows="4"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">ส่งความคิดเห็น</button>
    </form>
  {:else}
    <div class="login-prompt">
      <p>กรุณาเข้าสู่ระบบด้วย LINE เพื่อแสดงความคิดเห็น</p>
      <button on:click={login} class="login-btn">เข้าสู่ระบบด้วย LINE</button>
    </div>
  {/if}
</div>

<style>

  h2 {
    text-align: center;
  }
  .comment-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    /* font-family: "Sarabun", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center; */
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding: 10px;
    background: #f0f8ff;
    border-radius: 8px;
  }

  .user-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    font-family: inherit;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .star {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.2s;
  }

  .star.active {
    opacity: 1;
  }

  .submit-btn,
  .login-btn {
    background: #06c755;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn:hover,
  .login-btn:hover {
    background: #05b350;
  }

  .login-prompt {
    text-align: center;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
  }
</style>
