package org.complete.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.complete.domain.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TokenProvider {

    public final JwtProperties jwtProperties;

    // JWT 토큰 생성 메소드
    public String generateToken(User user, Duration expiredAt) { // 유저 정보, 만료 시간
        Date now = new Date();
        return makeToken(new Date(now.getTime() + expiredAt.toMillis()), user);
    }

    public String makeToken(Date expiry, User user) {
        Date now = new Date();  // 현재 시간

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)  // JWT 타입 설정
                .setIssuer(jwtProperties.getIssuer())  // 발급자 설정
                .setIssuedAt(now)  // 발급 일시 설정
                .setExpiration(expiry)  // 만료 일시 설정
                .setSubject(user.getEmail())  // 주체(유저 이메일) 설정
                .claim("id", user.getId())  // 유저 ID를 클레임에 추가
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())  // 비밀 키로 서명
                .compact();  // 토큰 생성
    }


    // 유효한 토큰인지 검사
    public boolean validToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtProperties.getSecretKey()) // 서명 검증을 위해 비밀 키 설정
                    .parseClaimsJws(token); // 토큰의 서명 부분을 파싱하고 유효성 검사 (서명 부분이 변경되지 않았는지 확인)
            return true; // 검증 성공
        } catch (Exception e) {
            return false; // 검증 실패
        }
    }


    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token); // JWT 토큰에서 클레임들 추출
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")); // 권한 설정

        // Spring Security에서 사용자를 인증할 때 사용하는 Authentication 객체 생성
        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.User(claims.getSubject()
                , "", authorities), token, authorities);
    }

    // JWT에서 사용자 ID를 추출하는 메서드
    public Long getUserId(String token) {
        Claims claims = getClaims(token); // 토큰에서 claims를 추출
        return claims.get("id", Long.class); // "id" 값을 Long 타입으로 변환하여 반환
    }

    // JWT를 파싱하여 Claims를 추출하는 메서드
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }
}