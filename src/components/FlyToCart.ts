export interface FlyToCartOptions {
	sourceEl: HTMLElement | null;
	targetEl: HTMLElement | null;
	imageUrl?: string;
	label?: string;
	durationMs?: number;
}

// Creates a polished fly-to-cart animation using a small floating box with the product image.
export function animateFlyToCart(options: FlyToCartOptions): void {
	try {
		const { sourceEl, targetEl, imageUrl, label, durationMs = 650 } = options;
		if (!sourceEl || !targetEl) return;

		const sourceRect = sourceEl.getBoundingClientRect();
		const targetRect = targetEl.getBoundingClientRect();

		const boxSize = Math.max(56, Math.min(96, Math.floor(Math.min(sourceRect.width, sourceRect.height) * 0.35)));
		const startLeft = sourceRect.left + sourceRect.width / 2 - boxSize / 2;
		const startTop = sourceRect.top + sourceRect.height / 2 - boxSize / 2;

		const container = document.createElement('div');
		container.style.position = 'fixed';
		container.style.left = `${startLeft}px`;
		container.style.top = `${startTop}px`;
		container.style.width = `${boxSize}px`;
		container.style.height = `${boxSize}px`;
		container.style.zIndex = '9999';
		container.style.pointerEvents = 'none';
		container.style.borderRadius = '12px';
		container.style.background = '#ffffff';
		container.style.border = '2px solid rgba(212, 175, 55, 0.6)'; // gold
		container.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15), 0 0 18px rgba(212,175,55,0.2)';
		container.style.overflow = 'hidden';
		container.style.transform = 'scale(1)';

		const img = document.createElement('img');
		img.src = imageUrl || '';
		img.alt = 'Adding to cart';
		img.style.width = '100%';
		img.style.height = '100%';
		img.style.objectFit = 'cover';
		container.appendChild(img);

		if (label) {
			const badge = document.createElement('div');
			badge.textContent = label;
			badge.style.position = 'absolute';
			badge.style.right = '6px';
			badge.style.bottom = '6px';
			badge.style.padding = '2px 6px';
			badge.style.fontSize = '12px';
			badge.style.fontWeight = '700';
			badge.style.color = '#fff';
			badge.style.background = 'linear-gradient(135deg, #A4193D, #722033)';
			badge.style.borderRadius = '8px';
			badge.style.boxShadow = '0 4px 10px rgba(164,25,61,0.35)';
			container.appendChild(badge);
		}

		document.body.appendChild(container);

		// compute translation to target center
		const endX = targetRect.left + targetRect.width / 2 - (startLeft + boxSize / 2);
		const endY = targetRect.top + targetRect.height / 2 - (startTop + boxSize / 2);

		// curved path using Web Animations API; fallback to simple transform if not available
		const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!prefersReduced && typeof (container as any).animate === 'function') {
			const controlX = endX * 0.4; // curve horizontally towards 40% of the distance
			const lift = Math.min(240, Math.max(140, Math.abs(endY) * 0.5)); // arc height
			const midY = endY - (endY < 0 ? lift : lift); // always arc upwards visually

			(container as any).animate([
				{ transform: 'translate(0px, 0px) scale(1)', opacity: 1, offset: 0 },
				{ transform: `translate(${controlX}px, ${midY}px) scale(0.6)`, opacity: 0.6, offset: 0.6 },
				{ transform: `translate(${endX}px, ${endY}px) scale(0.2)`, opacity: 0.15, offset: 1 }
			], {
				duration: durationMs,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				fill: 'forwards'
			});
			window.setTimeout(() => container.remove(), durationMs + 60);
		} else {
			// fallback straight path
			container.style.transition = `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${durationMs}ms ease`;
			requestAnimationFrame(() => {
				container.style.transform = `translate(${endX}px, ${endY}px) scale(0.2)`;
				container.style.opacity = '0.15';
			});
			window.setTimeout(() => container.remove(), durationMs + 50);
		}
	} catch {
		// no-op on animation failures
	}
}


