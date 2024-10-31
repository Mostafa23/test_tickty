// تحديث معلومات المستخدم
async function updateUser(userData) {
    const token = localStorage.getItem('token'); // استرجاع الرمز المميز من localStorage

    const response = await fetch('/updateUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // استخدام الرمز المميز هنا
        },
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const data = await response.json();
        alert('User information updated successfully!');
    } else {
        const errorData = await response.json();
        alert(`Failed to update user information: ${errorData.message}`);
    }
}
