const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load config
dotenv.config({ path: './config/config.env' });

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Debug logging dla plików statycznych
app.use((req, res, next) => {
    console.log(`Żądanie pliku: ${req.url}`);
    next();
});

// Static folder - dodajemy opcje debug
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
        console.log(`Serwowanie pliku statycznego: ${path}`);
        if (path.endsWith('.mp3')) {
            res.set('Content-Type', 'audio/mpeg');
            console.log('Ustawiono Content-Type: audio/mpeg');
        }
    }
}));

// Dane kontaktów
const contacts = {
    'pyszne': {
        name: 'Pyszne.pl',
        type: 'Jedzenie',
        avatar: 'P',
        color: '#FF424F',
        image: '/images/profiles/pyszne.jpg',
        description: 'Aplikacja do zamawiania jedzenia online',
        conversation: {
            title: 'Automatyczna sekretarka',
            messages: [
                "Witamy w Pyszne.pl! Twoje zamówienie jest w trakcie realizacji.",
                "Jesteśmy aplikacją do zamawiania jedzenia online.",
                "Obecnie wszystkie linie są zajęte przez głodnych klientów.",
                "Odwiedź naszą stronę www.pyszne.pl aby złożyć zamówienie!"
            ]
        }
    },
    'wieslawa': {
        name: 'Wieslawa Kasprzak',
        type: 'Komórka',
        avatar: 'WK',
        color: '#8E44AD',
        image: '/images/profiles/wieslawa.jpg',
        description: 'Babcia na wózku inwalidzkim, zawsze troszczy się o wnuka',
        conversation: {
            title: 'Babcia Igora',
            messages: [
                "Halo? Kto tam?",
                "A, to ty! Jak się ma mój wnuczek Igor?",
                "Właśnie upiekłam szarlotkę, może wpadniesz?",
                "Zawsze się martwię czy Igor je odpowiednio..."
            ]
        }
    },
    'igor': {
        name: 'Igor Kasprzak',
        type: 'iPhone',
        avatar: 'IK',
        color: '#2ECC71',
        image: '/images/profiles/igor.jpg',
        description: 'Młody rudy chłopak z zespołem Downa, wnuk Wiesławy, zmaga się z uzależnieniem od hazardu',
        conversation: {
            title: 'Wnuk Wiesławy',
            messages: [
                "Siema! Słuchaj, masz może 50 zł? Oddam w przyszłym tygodniu...",
                "Nie mam już na nic pieniędzy, przegrałem wszystko na Crash...",
                "KURWA MAĆ! Znowu crash na x1.02! Miało być x10!!!",
                "Przepraszam... Właśnie rzuciłem telefonem. Ekran pęknięty...",
                "Ty: Igor, musisz przestać grać. To nie jest zdrowe.",
                "Wiem... ale jak widzę te mines to nie mogę się powstrzymać...",
                "Ty: Co na to babcia Wiesława?",
                "Nie wie... Powiedziałem jej że zbieram na nowy telefon...",
                "Właśnie wszedłem na x50 na crash! Zaraz będę bogaty!",
                "*5 minut później*",
                "Przegrałem wszystko... *płacze* Nawet nie mam na bułki..."
            ]
        }
    },
    'negro': {
        name: 'Negro Garca',
        type: 'iPhone',
        avatar: 'NG',
        color: '#E67E22',
        image: '/images/profiles/negro.jpg',
        description: 'Wielki ciemnoskóry mężczyzna, miłośnik KFC',
        conversation: {
            title: 'Kolega Alexa',
            messages: [
                "Yo bro! What's up?",
                "Właśnie wracam z treningu z Alexem",
                "Może wyskoczymy gdzieś później?",
                "Alex też będzie, dawno się nie widzieliśmy!"
            ]
        }
    },
    'alex': {
        name: 'Alex Malysiusiak',
        type: 'Komórka',
        avatar: 'AM',
        color: '#3498DB',
        image: '/images/profiles/alex.jpg',
        description: '10-letnie dziecko z autyzmem, przyjaciel Negro',
        conversation: {
            title: 'Przyjaciel Negro',
            messages: [
                "Hej! Co słychać?",
                "Byłem właśnie na treningu z Negro",
                "Świetny koleś z niego, poznaliśmy się na siłowni",
                "Może wyskoczymy gdzieś we trójkę?"
            ]
        }
    },
    'inpost': {
        name: 'Dostawca inpost z dowcipaczka',
        type: 'Praca',
        avatar: 'DI',
        color: '#E74C3C',
        image: '/images/profiles/inpost.jpg',
        description: 'Bezdomny 50-latek żyjący z renty babci',
        conversation: {
            title: 'Dowcipniś z InPost',
            messages: [
                "Dzień dobry! InPost paczka dla Igora Kasprzaka!",
                "Hehe, mam nadzieję, że spodoba się 'prezent'...",
                "To był tylko żart! Nie gniewaj się!",
                "Następnym razem może coś bardziej... konwencjonalnego?"
            ]
        }
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('contacts', { contacts });
});

app.get('/call/:id', (req, res) => {
    const contact = contacts[req.params.id];
    if (!contact) {
        return res.redirect('/');
    }
    res.render('index', {
        callerName: contact.name,
        phoneModel: contact.type,
        conversation: contact.conversation,
        image: contact.image,
        description: contact.description,
        id: req.params.id
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Ścieżka do plików statycznych: ${path.join(__dirname, 'public')}`);
}); 