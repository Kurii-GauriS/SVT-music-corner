import pygame

# Start pygame
pygame.init()

# Create game window
WIDTH = 800
HEIGHT = 600

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("MiniTeen Flight 💎")

# Game loop
running = True

while running:

    # Check events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill background
    screen.fill((255, 230, 240))

    # Update screen
    pygame.display.flip()

# Close pygame
pygame.quit()