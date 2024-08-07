
import { Product } from './types';
import { Category } from '../category/types';

const ListsampleProducts: Product[] = [
    {
        id: 1,
        name: 'Teléfono Inteligente',
        description: 'Último modelo de teléfono inteligente con alto rendimiento.',
        price: 599.99,
        img: null,
        state: true,
        categories: [
            {
                id: 1,
            }
        ]
    },
    {
        id: 2,
        name: 'Zapatillas de Running',
        description: 'Zapatillas cómodas para correr en el uso diario.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1,}
        ]
    },
    {
        id: 3,
        name: 'Licuadora',
        description: 'Licuadora de alta velocidad para batidos y sopas.',
        price: 129.99,
        img: null,
        state: true,
        categories: [
            { id: 1,}
        ]
    },
    {
        id: 4,
        name: 'Balón de Fútbol',
        description: 'Balón duradero para jugar al aire libre.',
        price: 25.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 5,
        name: 'Osito de Peluche',
        description: 'Osito de peluche suave y abrazable para niños.',
        price: 19.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 6,
        name: 'Ordenador Portátil',
        description: 'Ordenador portátil de alto rendimiento para trabajar y jugar.',
        price: 899.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 7,
        name: 'Rastreador de Actividad',
        description: 'Monitorea tus actividades físicas y salud.',
        price: 149.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 8,
        name: 'Juego de Utensilios de Cocina',
        description: 'Juego completo de utensilios para todas tus necesidades de cocina.',
        price: 199.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 9,
        name: 'Cámara',
        description: 'Cámara de alta calidad para entusiastas de la fotografía.',
        price: 499.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 10,
        name: 'Auriculares Bluetooth',
        description: 'Auriculares inalámbricos con calidad de sonido superior.',
        price: 79.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 11,
        name: 'Chaqueta de Invierno',
        description: 'Chaqueta cálida para el invierno.',
        price: 129.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 12,
        name: 'Silla Ergonométrica',
        description: 'Silla ergonómica ideal para oficina.',
        price: 199.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 13,
        name: 'Lámpara LED',
        description: 'Lámpara LED de bajo consumo para la casa.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 14,
        name: 'Juego de Herramientas',
        description: 'Juego completo de herramientas para bricolaje.',
        price: 149.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 15,
        name: 'Escapada de Fin de Semana',
        description: 'Paquete de escapada para un fin de semana.',
        price: 299.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 16,
        name: 'Reloj Inteligente',
        description: 'Reloj inteligente con múltiples funciones.',
        price: 249.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 17,
        name: 'Juego de Juegos de Mesa',
        description: 'Diversión garantizada con este juego de mesa.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 18,
        name: 'Kit de Jardinería',
        description: 'Kit completo para comenzar con la jardinería.',
        price: 59.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 19,
        name: 'Cesta de Picnic',
        description: 'Cesta elegante para tus picnics al aire libre.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 20,
        name: 'Tocadiscos Vintage',
        description: 'Tocadiscos con un diseño vintage y excelente calidad de sonido.',
        price: 399.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 21,
        name: 'Cámara Instantánea',
        description: 'Cámara que imprime fotos al instante.',
        price: 249.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 22,
        name: 'Ventilador de Torre',
        description: 'Ventilador de torre con varias velocidades y modo oscilante.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 23,
        name: 'Espejo de Maquillaje',
        description: 'Espejo con iluminación LED y aumento.',
        price: 49.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 24,
        name: 'Botella de Agua Reutilizable',
        description: 'Botella de agua ecológica y reutilizable.',
        price: 19.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 25,
        name: 'Termómetro Digital',
        description: 'Termómetro digital preciso para medir la temperatura.',
        price: 15.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 26,
        name: 'Cargador Inalámbrico',
        description: 'Cargador inalámbrico compatible con la mayoría de los teléfonos inteligentes.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 27,
        name: 'Organizador de Escritorio',
        description: 'Organizador de escritorio con compartimentos múltiples.',
        price: 24.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 28,
        name: 'Colchón Inflable',
        description: 'Colchón inflable de alta calidad para camping o invitados.',
        price: 79.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 29,
        name: 'Cafetera de Goteo',
        description: 'Cafetera de goteo con temporizador y función de mantener caliente.',
        price: 59.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 30,
        name: 'Ropa de Cama 3 Piezas',
        description: 'Juego de ropa de cama de 3 piezas, incluye funda de almohada, sábana y cobija.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 31,
        name: 'Juguete Educativo',
        description: 'Juguete educativo para el desarrollo cognitivo de los niños.',
        price: 34.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 32,
        name: 'Plancha de Vapor',
        description: 'Plancha de vapor con ajuste de temperatura y función de autolimpieza.',
        price: 49.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 33,
        name: 'Pantalones Deportivos',
        description: 'Pantalones deportivos cómodos y transpirables para entrenar.',
        price: 49.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 34,
        name: 'Mochila de Senderismo',
        description: 'Mochila resistente al agua ideal para senderismo y excursiones.',
        price: 99.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 35,
        name: 'Altavoz Bluetooth',
        description: 'Altavoz Bluetooth portátil con sonido de alta calidad.',
        price: 69.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 36,
        name: 'Cinta Métrica',
        description: 'Cinta métrica de 5 metros para uso en la construcción y medidas.',
        price: 15.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 37,
        name: 'Escoba y Recogedor',
        description: 'Juego de escoba y recogedor para limpieza doméstica.',
        price: 19.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 38,
        name: 'Caja de Herramientas',
        description: 'Caja de herramientas resistente con múltiples compartimentos.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 39,
        name: 'Tenedor de Cocina',
        description: 'Tenedor de cocina de acero inoxidable con mango ergonómico.',
        price: 14.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 40,
        name: 'Gafas de Sol',
        description: 'Gafas de sol con protección UV y diseño moderno.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 41,
        name: 'Soporte para Laptop',
        description: 'Soporte ajustable para laptop que mejora la ergonomía.',
        price: 34.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 42,
        name: 'Ropa de Cama para Niños',
        description: 'Juego de ropa de cama con diseños infantiles.',
        price: 69.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 43,
        name: 'Lámpara de Escritorio',
        description: 'Lámpara de escritorio con ajuste de intensidad de luz.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 44,
        name: 'Bolsa de Deporte',
        description: 'Bolsa de deporte con múltiples compartimentos para tus accesorios.',
        price: 49.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 45,
        name: 'Almohada de Espuma',
        description: 'Almohada ergonómica de espuma con memoria para un sueño cómodo.',
        price: 59.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 46,
        name: 'Dispenser de Agua',
        description: 'Dispenser de agua con capacidad para 5 litros.',
        price: 79.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 47,
        name: 'Batidora de Mano',
        description: 'Batidora de mano con múltiples velocidades y accesorios.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 48,
        name: 'Portafolios de Cuero',
        description: 'Portafolios de cuero con compartimentos para documentos y dispositivos.',
        price: 129.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 49,
        name: 'Saco de Dormir',
        description: 'Saco de dormir con aislamiento térmico para acampadas.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 50,
        name: 'Jardín Vertical',
        description: 'Sistema de jardín vertical para cultivo en espacios reducidos.',
        price: 139.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 52,
        name: 'Cámara de Seguridad',
        description: 'Cámara de seguridad con visión nocturna y conexión Wi-Fi.',
        price: 149.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 53,
        name: 'Juegos de Construcción',
        description: 'Juego de bloques de construcción para desarrollar habilidades motoras.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 54,
        name: 'Estación Meteorológica',
        description: 'Estación meteorológica para monitorear el clima en casa.',
        price: 79.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 55,
        name: 'Ropa Interior',
        description: 'Ropa interior cómoda y transpirable para todos los días.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 56,
        name: 'Botellas Reutilizables',
        description: 'Botellas reutilizables para agua con tapa hermética.',
        price: 19.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 57,
        name: 'Aspiradora Robot',
        description: 'Aspiradora robot con función de mapeo y programación.',
        price: 249.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 58,
        name: 'Set de Maquillaje',
        description: 'Set completo de maquillaje con varios productos y herramientas.',
        price: 69.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 59,
        name: 'Cuna para Bebé',
        description: 'Cuna para bebé con barandillas ajustables y colchón incluido.',
        price: 199.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 60,
        name: 'Maleta de Viaje',
        description: 'Maleta de viaje con ruedas y compartimentos organizadores.',
        price: 119.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 61,
        name: 'Grill de Contacto',
        description: 'Grill de contacto con placas antiadherentes y ajuste de temperatura.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 62,
        name: 'Guantes de Cocina',
        description: 'Guantes de cocina resistentes al calor y con diseño antideslizante.',
        price: 18.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 63,
        name: 'Soporte para Celular',
        description: 'Soporte ajustable para celular con base antideslizante.',
        price: 24.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 64,
        name: 'Baterías Recargables',
        description: 'Paquete de baterías recargables para dispositivos electrónicos.',
        price: 22.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 65,
        name: 'Espejo con Luz LED',
        description: 'Espejo con iluminación LED ajustable para un maquillaje preciso.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 66,
        name: 'Tetera Eléctrica',
        description: 'Tetera eléctrica con función de apagado automático y ajuste de temperatura.',
        price: 49.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 67,
        name: 'Lámpara de Lava',
        description: 'Lámpara de lava decorativa con efectos de movimiento hipnóticos.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 68,
        name: 'Secador de Pelo',
        description: 'Secador de pelo con múltiples velocidades y ajuste de temperatura.',
        price: 59.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 69,
        name: 'Tijeras de Cocina',
        description: 'Tijeras de cocina multiusos con mango ergonómico.',
        price: 14.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 70,
        name: 'Pulsera de Actividad',
        description: 'Pulsera de actividad con monitor de frecuencia cardíaca y seguimiento de sueño.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 71,
        name: 'Zapatillas de Casa',
        description: 'Zapatillas de casa cómodas y cálidas para el hogar.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 72,
        name: 'Porta Documentos',
        description: 'Porta documentos elegante y resistente con múltiples compartimentos.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 73,
        name: 'Cuaderno de Notas',
        description: 'Cuaderno de notas con papel de alta calidad y encuadernación dura.',
        price: 14.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 74,
        name: 'Caja Fuerte',
        description: 'Caja fuerte de seguridad con combinación digital y compartimentos internos.',
        price: 159.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 75,
        name: 'Sistema de Sonido',
        description: 'Sistema de sonido con altavoces de alta calidad y conectividad Bluetooth.',
        price: 199.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 76,
        name: 'Maletín para Laptop',
        description: 'Maletín para laptop con compartimentos acolchados y diseño profesional.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 78,
        name: 'Lámpara de Pie',
        description: 'Lámpara de pie con diseño elegante y ajuste de altura.',
        price: 119.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 79,
        name: 'Kit de Maquillaje Profesional',
        description: 'Kit de maquillaje con una variedad de colores y productos profesionales.',
        price: 89.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 80,
        name: 'Hidrolavadora',
        description: 'Hidrolavadora de alta presión ideal para limpieza exterior.',
        price: 229.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 81,
        name: 'Set de Herramientas',
        description: 'Set completo de herramientas para reparaciones y proyectos caseros.',
        price: 99.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 82,
        name: 'Estufa de Gas',
        description: 'Estufa de gas con múltiples quemadores y función de encendido automático.',
        price: 199.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 83,
        name: 'Sombrilla para Patio',
        description: 'Sombrilla para patio con base pesada y ajuste de inclinación.',
        price: 129.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 84,
        name: 'Aparato de Ejercicio',
        description: 'Aparato de ejercicio multifuncional para entrenamiento en casa.',
        price: 249.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 85,
        name: 'Funda para Sofá',
        description: 'Funda para sofá a prueba de manchas y fácil de instalar.',
        price: 69.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 86,
        name: 'Juego de Ollas',
        description: 'Juego de ollas de acero inoxidable con tapas a juego.',
        price: 119.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 87,
        name: 'Gimnasio de Casa',
        description: 'Equipo de gimnasio de casa con pesas, bandas y esterilla.',
        price: 299.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 88,
        name: 'Parrilla Eléctrica',
        description: 'Parrilla eléctrica con temperatura regulable y superficie antiadherente.',
        price: 79.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 89,
        name: 'Ropa de Baño',
        description: 'Ropa de baño de alta calidad para hombres y mujeres.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 90,
        name: 'Mini Refrigerador',
        description: 'Mini refrigerador compacto ideal para oficinas o dormitorios.',
        price: 149.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 91,
        name: 'Reloj Inteligente',
        description: 'Reloj inteligente con monitoreo de salud y notificaciones de smartphone.',
        price: 129.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 92,
        name: 'Cesta de Ropa',
        description: 'Cesta de ropa con diseño moderno y material resistente.',
        price: 24.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 93,
        name: 'Kit de Pintura',
        description: 'Kit completo para pintura con pinceles, rodillos y pinturas.',
        price: 54.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 94,
        name: 'Batería Externa',
        description: 'Batería externa de alta capacidad para cargar dispositivos móviles.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 95,
        name: 'Cesta de Picnic',
        description: 'Cesta de picnic con compartimentos para alimentos y bebidas.',
        price: 59.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 96,
        name: 'Set de Jardinería',
        description: 'Set completo de jardinería con herramientas esenciales y guantes.',
        price: 44.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 97,
        name: 'Cámara Instantánea',
        description: 'Cámara instantánea para imprimir fotos al instante.',
        price: 99.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 98,
        name: 'Set de Cubiertos',
        description: 'Set de cubiertos de acero inoxidable con diseño elegante.',
        price: 39.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    },
    {
        id: 99,
        name: 'Gafas de Lectura',
        description: 'Gafas de lectura con lentes antirreflejantes y diseño moderno.',
        price: 19.99,
        img: null,
        state: true,
        categories: [
            { id: 1, }
        ]
    },
    {
        id: 100,
        name: 'Caja de Almacenamiento',
        description: 'Caja de almacenamiento con tapa y capacidad para objetos pequeños.',
        price: 29.99,
        img: null,
        state: true,
        categories: [
            { id: 1, },
            { id: 1, }
        ]
    }
];


const newCategories: Category[] = [
    { id: 613, name: "Electrónica" },
    { id: 614, name: "Moda" },
    { id: 615, name: "Juguetes" },
    { id: 616, name: "Deportes" },
    { id: 617, name: "Hogar" },
    { id: 618, name: "Libros" },
    { id: 619, name: "Alimentos" },
    { id: 620, name: "Electrodomésticos" },
    { id: 621, name: "Ropa y Accesorios" },
    { id: 622, name: "Salud y Cuidado Personal" },
    { id: 623, name: "Belleza" },
    { id: 624, name: "Automóviles" },
    { id: 625, name: "Mascotas" },
    { id: 626, name: "Oficina y Papelería" },
    { id: 627, name: "Herramientas y Construcción" },
    { id: 628, name: "Jardinería" },
    { id: 629, name: "Instrumentos Musicales" },
    { id: 630, name: "Videojuegos" },
    { id: 631, name: "Bebés y Niños" },
    { id: 632, name: "Joyería y Relojes" },
    { id: 633, name: "Viajes y Equipaje" },
    { id: 634, name: "Arte y Artesanía" },
    { id: 635, name: "Cine y Fotografía" },
    { id: 636, name: "Tecnología" },
    { id: 637, name: "Cocina y Comedor" },
    { id: 638, name: "Cuidado del Cabello" },
    { id: 639, name: "Deportes de Aventura" },
    { id: 640, name: "Productos Ecológicos" },
    { id: 641, name: "Gourmet y Delicatessen" },
    { id: 642, name: "Accesorios para Vehículos" },
    { id: 643, name: "Mobiliario de Exterior" },
    { id: 644, name: "Relojes Inteligentes" },
    { id: 645, name: "Fitness y Gimnasio" },
    { id: 646, name: "Nutrición Deportiva" },
    { id: 647, name: "Accesorios para Mascotas" },
    { id: 648, name: "Juegos de Mesa" },
    { id: 649, name: "Suministros de Limpieza" },
    { id: 650, name: "Accesorios para Móviles" },
    { id: 651, name: "Seguridad y Vigilancia" },
    { id: 652, name: "Suministros Médicos" },
    { id: 653, name: "Productos para el Cuidado de la Piel" },
    { id: 654, name: "Accesorios para Viaje" },
    { id: 655, name: "Decoración del Hogar" },
    { id: 656, name: "Accesorios para Cámaras" },
    { id: 657, name: "Ropa de Dormir" },
    { id: 658, name: "Camping y Aire Libre" },
    { id: 659, name: "Caza y Pesca" },
    { id: 660, name: "Bicicletas y Accesorios" },
    { id: 661, name: "Textiles del Hogar" },
    { id: 662, name: "Relojería" },
    { id: 663, name: "Productos para el Baño" },
    { id: 664, name: "Productos de Papelería" },
    { id: 665, name: "Accesorios de Cocina" },
];


    
function getRandomCategories(num: number): Category[] {
    const shuffled = [...newCategories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function transformProducts(products: Product[]): Product[] {
return products.map(product => ({
    ...product,
    categories: getRandomCategories(3), // Adjust the number of random categories as needed
    img: null, // Set the img property to null
}));
}
// Sample usage with sampleProducts
export const sampleProducts = transformProducts(ListsampleProducts);