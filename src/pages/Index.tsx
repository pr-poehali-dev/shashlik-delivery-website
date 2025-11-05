import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  isPopular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Шашлык из свинины',
    description: 'Сочное мясо, маринованное по классическому рецепту',
    price: 450,
    weight: '300г',
    image: 'https://cdn.poehali.dev/projects/846d26ec-eea5-49de-abd3-3bffbfd04a10/files/9df55331-9399-4c38-b07b-baada925e3bc.jpg',
    isPopular: true
  },
  {
    id: 2,
    name: 'Шашлык из курицы',
    description: 'Нежная куриная грудка с пряными травами',
    price: 350,
    weight: '300г',
    image: 'https://cdn.poehali.dev/projects/846d26ec-eea5-49de-abd3-3bffbfd04a10/files/771374b5-b1ec-4ece-8266-93176d67c79d.jpg',
    isPopular: true
  },
  {
    id: 3,
    name: 'Шашлык из баранины',
    description: 'Традиционный восточный шашлык с луком',
    price: 550,
    weight: '300г',
    image: 'https://cdn.poehali.dev/projects/846d26ec-eea5-49de-abd3-3bffbfd04a10/files/6fc3596f-e887-467e-8886-ddb5f52d426c.jpg'
  },
  {
    id: 4,
    name: 'Люля-кебаб',
    description: 'Рубленое мясо с ароматными специями',
    price: 380,
    weight: '250г',
    image: 'https://cdn.poehali.dev/projects/846d26ec-eea5-49de-abd3-3bffbfd04a10/files/9df55331-9399-4c38-b07b-baada925e3bc.jpg',
    isPopular: true
  },
  {
    id: 5,
    name: 'Шашлык из говядины',
    description: 'Отборная мраморная говядина',
    price: 520,
    weight: '300г',
    image: 'https://cdn.poehali.dev/projects/846d26ec-eea5-49de-abd3-3bffbfd04a10/files/771374b5-b1ec-4ece-8266-93176d67c79d.jpg'
  },
  {
    id: 6,
    name: 'Овощи на мангале',
    description: 'Микс из свежих овощей гриль',
    price: 250,
    weight: '200г',
    image: '/placeholder.svg'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== id);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Flame" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold font-heading text-primary">Шашлык Express</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-foreground hover:text-primary transition-colors">Меню</a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#promo" className="text-foreground hover:text-primary transition-colors">Акции</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="default" className="relative">
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                Корзина
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent">{getTotalItems()}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-heading">Ваш заказ</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="ShoppingBag" className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => removeFromCart(item.id)}>
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button size="icon" variant="outline" onClick={() => addToCart(item)}>
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{getTotalPrice()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" className="ml-2" size={20} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6">
              Настоящий шашлык с доставкой за 40 минут! 🔥
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Свежее мясо, маринованное по авторским рецептам. Готовим на углях и доставляем горячим прямо к вам.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="text-lg" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="ShoppingCart" className="mr-2" size={24} />
                Смотреть меню
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                <Icon name="Phone" className="mr-2" size={24} />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="promo" className="py-12 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-accent to-accent/80 text-white p-6 rounded-2xl shadow-lg animate-scale-in gap-4">
            <div className="flex items-center gap-4">
              <Icon name="Gift" size={40} />
              <div>
                <h3 className="text-2xl font-bold font-heading">Скидка 20% на первый заказ!</h3>
                <p className="text-white/90">Промокод: ПЕРВЫЙ20</p>
              </div>
            </div>
            <Button variant="secondary" size="lg" onClick={() => setIsCartOpen(true)}>
              Заказать сейчас
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Наше меню</h2>
            <p className="text-xl text-muted-foreground">Выбирай лучшие шашлыки в городе</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  {item.isPopular && (
                    <Badge className="absolute top-3 right-3 bg-accent">
                      <Icon name="TrendingUp" size={14} className="mr-1" />
                      Популярное
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-heading">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{item.price} ₽</p>
                      <p className="text-sm text-muted-foreground">{item.weight}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => addToCart(item)}>
                    <Icon name="Plus" className="mr-2" size={18} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12 text-center">Доставка</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" className="mx-auto mb-4 text-primary" size={48} />
                <CardTitle className="font-heading">40 минут</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Среднее время доставки по городу</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" className="mx-auto mb-4 text-primary" size={48} />
                <CardTitle className="font-heading">Зона доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Бесплатная доставка от 1000 ₽</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Utensils" className="mx-auto mb-4 text-primary" size={48} />
                <CardTitle className="font-heading">Горячим</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Термосумки сохраняют температуру</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы готовим шашлык с 2015 года. Наша команда мастеров мангала использует только свежее мясо высшего качества 
              и авторские маринады. Каждая порция готовится на настоящих древесных углях прямо перед доставкой.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">9+</p>
                <p className="text-muted-foreground">лет опыта</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">50К+</p>
                <p className="text-muted-foreground">заказов</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">4.9</p>
                <p className="text-muted-foreground">рейтинг</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">15+</p>
                <p className="text-muted-foreground">позиций</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Контакты</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={24} />
                <a href="tel:+79001234567" className="hover:text-accent transition-colors">+7 (900) 123-45-67</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Mail" size={24} />
                <a href="mailto:info@shashlik-express.ru" className="hover:text-accent transition-colors">info@shashlik-express.ru</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="MapPin" size={24} />
                <span>г. Москва, ул. Примерная, 123</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Clock" size={24} />
                <span>Ежедневно: 10:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/5 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Шашлык Express. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;