document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const imageTitle = document.getElementById('image-title');
    const imageDate = document.getElementById('image-date');
    const imageCategory = document.getElementById('image-category');
    const imageTags = document.getElementById('image-tags');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 当前查看的图片索引
    let currentImageIndex = 0;
    let filteredPhotos = Array.from(photoItems);
    
    // 筛选照片函数
    function filterPhotos(filter, searchTerm = '') {
        filteredPhotos = Array.from(photoItems).filter(item => {
            const matchesFilter = filter === 'all' || item.classList.contains(filter);
            const matchesSearch = searchTerm === '' || 
                item.dataset.title.toLowerCase().includes(searchTerm) || 
                item.dataset.tags.toLowerCase().includes(searchTerm);
            return matchesFilter && matchesSearch;
        });
        
        // 隐藏所有照片
        photoItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // 显示筛选后的照片
        filteredPhotos.forEach(item => {
            item.style.display = 'block';
        });
    }
    
    // 筛选按钮点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 获取筛选类别
            const filter = this.dataset.filter;
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            // 筛选照片
            filterPhotos(filter, searchTerm);
        });
    });
    
    // 搜索功能
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterPhotos(activeFilter, searchTerm);
    }
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // 查看大图功能
    function openModal(index) {
        const photo = filteredPhotos[index];
        const imgSrc = photo.querySelector('img').src;
        const title = photo.dataset.title;
        const date = photo.dataset.date;
        const category = photo.classList[1]; // 获取第二个类名作为分类
        const tags = photo.dataset.tags.split(' ');
        
        // 设置模态框内容
        modalImage.src = imgSrc;
        modalImage.alt = title;
        imageTitle.textContent = title;
        imageDate.textContent = date;
        
        // 设置分类显示文本
        let categoryText = '';
        switch(category) {
            case 'nature': categoryText = '自然风光'; break;
            case 'urban': categoryText = '城市建筑'; break;
            case 'portrait': categoryText = '人像摄影'; break;
            case 'street': categoryText = '街头纪实'; break;
            default: categoryText = category;
        }
        imageCategory.textContent = categoryText;
        
        // 设置标签
        imageTags.innerHTML = '';
        tags.forEach(tag => {
            if (tag.trim() !== '') {
                const tagElement = document.createElement('span');
                tagElement.textContent = tag;
                imageTags.appendChild(tagElement);
            }
        });
        
        // 更新当前索引
        currentImageIndex = index;
        
        // 显示模态框
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // 为所有查看按钮添加事件
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 找到这张照片在筛选后的数组中的位置
            const photoItem = this.closest('.photo-item');
            const filteredIndex = filteredPhotos.indexOf(photoItem);
            openModal(filteredIndex);
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 上一张/下一张导航
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        openModal(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredPhotos.length;
        openModal(currentImageIndex);
    }
    
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // 初始化显示所有照片
    filterPhotos('all');
});
// js/photography.js

// 图片分类筛选功能
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动按钮
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // 过滤照片
            photoItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

