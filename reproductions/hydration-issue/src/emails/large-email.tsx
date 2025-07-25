import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

// Create a large email to trigger the hydration markers
const LargeEmail = () => {
  // Generate lots of content to exceed the size threshold
  const items = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    title: `Product ${i + 1}`,
    description: `This is a detailed description for product ${i + 1}. It contains multiple sentences to make the email larger. We need to ensure the content is substantial enough to trigger React's hydration optimizations.`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
  }));

  return (
    <Html>
      <Head />
      <Preview>Browse our extensive collection of products</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading as="h1" style={{ color: '#333', textAlign: 'center' }}>
            Product Catalog
          </Heading>
          <Text style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>
            Browse our extensive collection of products
          </Text>

          {items.map((item) => (
            <Section
              key={item.id}
              style={{
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '15px' }}>
                <Img
                  src={item.image}
                  alt={item.title}
                  width="100"
                  height="100"
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Heading
                    as="h2"
                    style={{
                      margin: '0 0 10px 0',
                      fontSize: '18px',
                      color: '#333',
                    }}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    style={{
                      margin: '0 0 10px 0',
                      color: '#666',
                      fontSize: '14px',
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#2ecc71',
                    }}
                  >
                    {item.price}
                  </Text>
                </div>
              </div>
            </Section>
          ))}

          <Section
            style={{
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Heading as="h3" style={{ margin: '0 0 10px 0', color: '#333' }}>
              Need Help?
            </Heading>
            <Text style={{ margin: '0 0 15px 0', color: '#666' }}>
              Our customer service team is here to assist you
            </Text>
            <Link
              href="https://example.com/support"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              Contact Support
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LargeEmail;

