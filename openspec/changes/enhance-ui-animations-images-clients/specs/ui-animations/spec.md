## ADDED Requirements

### Requirement: Scroll-triggered section animations
The system SHALL animate page sections into view using Framer Motion's `whileInView` API when they enter the viewport. All public pages SHALL wrap their content sections with an `AnimatedSection` component that provides fade-in, slide-in-from-bottom, slide-in-from-left, and slide-in-from-right animation variants.

#### Scenario: Section animates on first scroll into view
- **WHEN** a user scrolls a public page and a content section enters the viewport
- **THEN** the section SHALL animate into view (fade + slide) once and SHALL NOT re-animate on subsequent scrolls

#### Scenario: User prefers reduced motion
- **WHEN** a user has `prefers-reduced-motion: reduce` enabled in their browser
- **THEN** all animations SHALL be disabled and content SHALL appear immediately without transition

### Requirement: Staggered list animations
The system SHALL support staggered animations for lists of items (services, clients, FAQ items, gallery items). Each item in the list SHALL animate in sequence with a configurable delay between items.

#### Scenario: Services grid animates with stagger
- **WHEN** the services grid section scrolls into view on the Layanan page
- **THEN** each service card SHALL animate in sequence with a 100ms delay between cards

#### Scenario: Client logos animate with stagger
- **WHEN** the client showcase section scrolls into view on the Beranda page
- **THEN** each client logo SHALL animate in sequence with a 75ms delay between logos

### Requirement: Hero section entrance animation
The system SHALL animate the hero section on page load with a title slide-in and subtitle fade-in effect on the Beranda page.

#### Scenario: Hero loads on Beranda
- **WHEN** the Beranda page loads
- **THEN** the hero title SHALL slide in from below and the hero subtitle SHALL fade in with a 200ms delay after the title