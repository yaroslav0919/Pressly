import Button from '@components/Button/Button';

describe('Button', () => {
  it('should match snapshot', () => {
    cy.mount(<Button>Click me</Button>)
      .getClassContain('Button_root')
      .getClassContain('Button_rootPrimary')
      .should('be.visible');
  });

  it('should apply the root class name and the custom class name', () => {
    cy.mount(<Button className='custom-class'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('custom-class')
      .should('be.visible');
  });
});

describe('Button variant', () => {
  it('should apply the primary variant class name', () => {
    cy.mount(<Button variant='primary'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootPrimary')
      .should('be.visible');
  });

  it('should apply the secondary variant class name', () => {
    cy.mount(<Button variant='secondary'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootSecondary')
      .should('be.visible');
  });

  it('should apply the text variant class name', () => {
    cy.mount(<Button variant='text'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootText')
      .should('be.visible');
  });

  it('should apply the icon variant class name', () => {
    cy.mount(<Button variant='icon'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootIconBtn')
      .should('be.visible');
  });

  it('should apply the important variant class name', () => {
    cy.mount(<Button variant='important'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootImportant')
      .should('be.visible');
  });

  it('should apply the small size class name', () => {
    cy.mount(<Button size='small'>Click me</Button>);
    cy.getClassContain('Button_root')
      .getClassContain('rootSmall')
      .should('be.visible');
  });
});
