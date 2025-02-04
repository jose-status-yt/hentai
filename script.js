function verifyAge() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        document.getElementById('error-message').innerText = 'Por favor, informe sua data de nascimento.';
        return;
    }

    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age >= 18) {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 100);
        document.cookie = `birthdate=${birthdate}; path=/; expires=${expirationDate.toUTCString()}`;
        showWelcome();
    } else {
        document.cookie = `blocked=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        showBlocked();
    }
}

function checkAge() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const blockedCookie = cookies.find(cookie => cookie.startsWith('blocked=true'));

    if (blockedCookie) {
        showBlocked();
        return;
    }

    const birthdateCookie = cookies.find(cookie => cookie.startsWith('birthdate='));

    if (birthdateCookie) {
        const birthdate = birthdateCookie.split('=')[1];
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 18) {
            showWelcome();
        } else {
            showBlocked();
        }
    }
}

function showWelcome() {
    document.getElementById('age-verification').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
}

function showBlocked() {
    document.getElementById('age-verification').style.display = 'none';
    document.getElementById('blocked').style.display = 'block';
}

checkAge();
