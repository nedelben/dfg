const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('input');
const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;
const postsContainer = document.getElementById('postsContainer');

let page = 1;
const limit = 20;
let loadingPosts = false;

// تبديل الوضع الداكن
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

// عند الضغط على زر البحث: فقط فتح مربع البحث، لا تحميل منشورات
searchBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setTimeout(() => {
    searchBox.classList.add('active');
    input.focus();
  }, 300);
});

// إخفاء البحث عند الضغط خارج محرك البحث
document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target)) {
    searchBox.classList.remove('active');
  }
});

// محاكاة جلب بيانات المنشورات (تستبدلها ب API حقيقية)
function fetchPosts(page, limit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = [];
      for (let i = 1; i <= limit; i++) {
        const postNumber = (page - 1) * limit + i;
        posts.push({ id: postNumber, title: `منشور رقم ${postNumber}` });
      }
      resolve(posts);
    }, 800);
  });
}

// عرض المنشورات في الصفحة
function displayPosts(posts) {
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.textContent = post.title;
    postsContainer.appendChild(postDiv);
  });
}

// تحميل منشورات جديدة
async function loadPosts() {
  if (loadingPosts) return;
  loadingPosts = true;

  const posts = await fetchPosts(page, limit);

  displayPosts(posts);
  page++;
  loadingPosts = false;
}

// تحميل أول دفعة منشورات عند تحميل الصفحة
window.addEventListener('load', () => {
  loadPosts();
});
