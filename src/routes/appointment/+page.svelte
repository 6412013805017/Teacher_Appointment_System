<script>
	import { onMount } from "svelte";
	import { getTeacher, addTimeStot, getTimeSlot } from "$lib/timeSlots";

	let studentId = "";
	let name = "";
	let lastname = "";
	let selecterTeacher = "";

	let date = "";
	let appointments = [];
	let loading;
	let loading1;
	let buttonStatus = false;

	let timeSlot = "";

	let teacherName;
	let timeAppointment;

	const timeSlots = [
		"08:00 - 09:00",
		"09:00 - 10:00",
		"10:00 - 11:00",
		"11:00 - 12:00",
		"12:00 - 13:00",
		"13:00 - 14:00",
		"14:00 - 15:00",
		"15:00 - 16:00",
		"16:00 - 17:00",
	];

	onMount(async () => {
		await loadTeacherName();
	});

	async function loadTeacherName() {
		try {
			loading = true;
			const result = await getTeacher();
			if (result.success) {
				teacherName = result.data.reverse(); // ล่าสุดก่อน
				console.log(teacherName);
			}
		} catch (error) {
			console.error("Error loading comments:", error);
		} finally {
			loading = false;
		}
	}

	async function getAppointment() {
		const data = {
			teacher: selecterTeacher,
			date,
		};
		try {
			loading1 = true;
			const result = await getTimeSlot(data);
			if (result.success) {
				timeAppointment = result.data.reverse(); // ล่าสุดก่อน
				console.log(timeAppointment);
			}
		} catch (error) {
			console.error("Error loading comments:", error);
		} finally {
			loading1 = false;
		}
	}

	$: if (selecterTeacher && date) {
		getAppointment();
	}

	async function addAppointment() {
		// alert(selecterTeacher)
		if (studentId && name && lastname && selecterTeacher && date && timeSlot) {
			buttonStatus = true;
			try {
				const data = {
					studentId,
					name,
					lastname,
					selecterTeacher,
					date,
					timeSlot,
				};

				console.log(data);

				const result = await addTimeStot(data);

				if (result.success) {
					alert("ส่งข้อมูลเรียบร้อย!");
					window.location.reload();
				}
			} catch (error) {
				console.error(error);
				alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
			}
		}else {
			alert("กรุณากรอกข้อมูลให้ครบก่อน")
		}
	}
</script>

<main>
	<h1>📅 ระบบนัดหมาย</h1>

	<div class="form">
		<input bind:value={studentId} placeholder="รหัสนักศึกษา" />
		<div class="gap">
			<input bind:value={name} placeholder="ชื่อ" />
			<input bind:value={lastname} placeholder="นามสกุล" />
		</div>

		<div class="gap">
			<select name="" id="" bind:value={selecterTeacher}>
				{#if loading}
					<option value="">กำลังโหลด</option>
				{:else}
					<option value="">-- เลือกอาจาร์ย --</option>
					{#each teacherName as option}
						<option value={option.name}>{option.name}</option>
					{/each}
				{/if}
			</select>
			<input type="date" bind:value={date} />
		</div>
		{#if loading1}
			<p>กำลังโหลดข้อมูล</p>
		{:else if timeAppointment}
			<div class="time-slots">
				<p>⏰ เลือกช่วงเวลา:</p>
				<div class="gap">
					{#each timeSlots as slot}
						<button
							type="button"
							class:active={timeSlot === slot}
							on:click={() => (timeSlot = slot)}
							disabled={timeAppointment.some(
								(a) => a.time === slot,
							)}
						>
							{slot}
						</button>
					{/each}
				</div>
			</div>
		{/if}
		<button class="add-btn" disabled={buttonStatus} on:click={addAppointment}
			>➕ เพิ่มนัดหมาย</button
		>
	</div>
</main>

<style>
	main {
		padding-inline: 1rem;
		font-family: "Segoe UI", sans-serif;
		background: #f9f9ff;
		width: 60%;
		margin: auto;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}
	h1,
	h2 {
		text-align: center;
		color: #333;
	}
	.form {
		width: 100%;
		background: white;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	input,
	select {
		padding: 0.7rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
	}
	.time-slots {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 5px;
	}
	.time-slots button {
		padding: 5px 5px;
		border: none;
		border-radius: 0.5rem;
		background: #eee;
		cursor: pointer;
		transition: background 0.2s;
	}
	.time-slots button.active {
		background: #4e73df;
		color: white;
	}
	.time-slots button:hover {
		background: #cfd8ff;
	}
	.add-btn {
		background: #28a745;
		color: white;
		padding: 0.7rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}
	.add-btn:hover {
		background: #218838;
	}
	button:disabled {
		border: 1px solid #616161;
	}
	.appointments {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.card {
		background: white;
		padding: 1rem;
		border-radius: 0.7rem;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
	}
	.gap {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5px;
	}
	.gap button,
	.gap input,
	.gap select {
		flex: 1;
	}

	@media (max-width: 600px) {
		main {
			width: 80%;
		}
	}
</style>
