document.getElementById('image').addEventListener('change', function (e) {
  const preview = document.getElementById('preview');
  const files = Array.from(e.target.files);

  preview.innerHTML = ''; // ล้างรูปก่อนหน้า

  if (files.length > 5) {
    alert('สามารถอัปโหลดรูปภาพได้ไม่เกิน 5 รูป');
    e.target.value = ''; // เคลียร์ input
    return;
  }

  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-img';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// เพิ่มการส่งแบบฟอร์มที่รองรับหลายรูปได้หากใช้ Google Apps Script ในการจัดเก็บ (อาจต้องเพิ่มโค้ดฝั่ง backend รองรับ)
document.getElementById('repair-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = document.getElementById('repair-form');
  const formData = new FormData(form);

  // ตรวจสอบจำนวนรูปอีกครั้ง
  const images = document.getElementById('image').files;
  if (images.length > 5) {
    alert('สามารถอัปโหลดได้ไม่เกิน 5 รูป');
    return;
  }

  const scriptURL = 'https://script.google.com/macros/s/your_script_id/exec'; // เปลี่ยนตามจริง

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.text())
    .then(result => {
      alert('ส่งข้อมูลเรียบร้อยแล้ว');
      form.reset();
      document.getElementById('preview').innerHTML = '';
    })
    .catch(error => {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    });
});
