// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            
            // 简单的前端验证
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('请输入有效的电子邮件地址');
                return;
            }
            
            // 模拟表单提交
            alert('感谢您的留言！我会尽快回复您。');
            this.reset();
            
            // 实际使用时可以取消下面的注释，使用AJAX提交表单
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('感谢您的留言！我会尽快回复您。');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('提交失败，请稍后再试。');
            });
            */
        });
    }
    
    // 简单的邮箱验证
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
